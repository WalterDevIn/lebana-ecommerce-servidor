import express from "express";
import pool from "./config/conection.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API RESTful - Productos");
});


app.get("/productos", async (req, res) => {
  const { title, minPrice, maxPrice } = req.query;

  let sql = "SELECT * FROM productos WHERE 1=1";
  const params = [];

  if (title) {
    sql += " AND title LIKE ?";
    params.push(`%${title}%`);
  }

  if (minPrice) {
    sql += " AND price >= ?";
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    sql += " AND price <= ?";
    params.push(Number(maxPrice));
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, params);
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
});


app.get("/productos/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM productos WHERE id = ?";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, [id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).send("Producto no encontrado");
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el producto");
  }
});


app.post("/productos", async (req, res) => {
  const { title, price, description, image, stock } = req.body;

  if (!title || !price) {
    return res.status(400).send("El título y el precio son obligatorios");
  }

  const sql = `
    INSERT INTO productos (title, price, description, image, stock)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [
      title,
      price,
      description || null,
      image || null,
      stock || 0,
    ]);
    connection.release();

    res.status(201).json({
      id: result.insertId,
      title,
      price,
      description,
      image,
      stock,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el producto");
  }
});


app.put("/productos/:id", async (req, res) => {
  const id = req.params.id;
  const { title, price, description, image, stock } = req.body;

  const sql = `
    UPDATE productos 
    SET title = ?, price = ?, description = ?, image = ?, stock = ?
    WHERE id = ?
  `;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [
      title,
      price,
      description,
      image,
      stock,
      id,
    ]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).send("Producto no encontrado");
    }

    res.send("Producto actualizado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el producto");
  }
});


app.delete("/productos/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM productos WHERE id = ?";

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).send("Producto no encontrado");
    }

    res.send("Producto eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el producto");
  }
});

// MiddleWare - 404
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
