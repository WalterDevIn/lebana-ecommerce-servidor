import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
  connectionLimit: 5,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Conexión exitosa a la base de datos 'tienda'");
    connection.release();
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:");
    console.error(error.message);
  });

export default pool;
