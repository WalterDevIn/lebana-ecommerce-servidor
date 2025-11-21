import pool from '../config/conexion.js'


export const getAllProduct = async () => {
    const sql = "SELECT * FROM products"; 
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql); 
      conection.release(); 
      return rows;
    }catch(error){ 
        return error
    }
  
}

export const getProductById = async (id) => {
    const sql = `SELECT * FROM products WHERE id_product = ?`;
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [id]);
      conection.release();
      return rows
      
    }catch(error){
        return error
    }
}

export const createProduct = async (values) => {
    const sql = `INSERT INTO products SET ?`
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [values]);
      conection.release(); 
      return rows

    }catch(error){ 
      return error
    }
}

export const updateProduct = async(newValues, id) => {
    const sql = `UPDATE products SET ? WHERE id_product = ?`;
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [newValues, id]);
      conection.release(); 
      return rows  
    }catch(error){ 
        return error
    }
}

export const deleteProduct = async(id) => {
    const sql = "DELETE FROM products WHERE id_product = ?";
  
    try{ 
      const conection = await pool.getConnection(); 
      const [rows] = await conection.query(sql, [id]);
      conection.release(); 
      console.log(rows);
      return rows  

    }catch(error){ 
        return error
    }
}