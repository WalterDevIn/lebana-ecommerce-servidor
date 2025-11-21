import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";   
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('./public'))
app.use(cors())
app.use(cookieParser())

import usersRouter from './routes/users.routes.js';
import productsRoutes from "./routes/products.routes.js";

app.use('/users', usersRouter);
app.use('/products', productsRoutes);

app.get("/", (req, res) => res.json({ mensaje: "Bienvenido" }));

app.use((req, res) => {
    res.status(404).send('La ruta solicitada no existe')
})

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))