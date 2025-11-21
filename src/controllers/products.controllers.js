import pool from '../config/conexion.js'
import * as model from '../models/products.model.js'

export const getAllProduct = async (req, res) => {
  const rows= await model.getAllProduct()
  if(rows.error){
     return res.status(500).send("algo salio mal")
  }
  (rows.length >0)? res.json(rows): res.send("NO HAY PRODUCTOSSS")
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
    const rows = await model.getProductById(id)
    if(rows.error){
     return res.status(500).send("algo salio mal")
  }

    (rows[0])? res.json(rows[0]) : res.status(404).send("Producto no existe")
}

export const createProduct = async (req, res) => {
    const values = req.body
    const rows = model.createProduct(values)

    if(rows.error){
     return res.status(500).send("algo salio mal")
    }
    res.status(201).send(`nuevo producto con id ${rows.insertId}`)
    
}

export const updateProduct = async(req, res) => {
     const id = req.params.id;
     const newValues = req.body
     const rows = model.updateProduct(newValues, id)

      if(rows.error){
         return res.status(500).send("algo salio mal")
      }

   (rows.affectedRows == 0)? res.status(404).send("Producto no existe") : res.send("Producto actualizado")

}

export const deleteProduct = async(req, res) => {
    const id = Number(req.params.id);
    const rows = model.deleteProduct(id)

    if(rows.error){
      return res.status(500).send("algo salio mal")
    }

    (rows.affectedRows == 0)? res.status(404).send("Producto no existe") : res.send("PRODUCTO ELIMINADO");
  }