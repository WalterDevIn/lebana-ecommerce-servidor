import { Router } from "express";
import pool from '../config/conexion.js'
import {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct} from "../controllers/products.controllers.js"

const router = Router();

router.get("", getAllProduct)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;