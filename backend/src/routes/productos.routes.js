import { Router } from "express";
import { getProductos, createProducto, updateProducto, deleteProducto, getProducto } from "../controllers/productos.controller.js";

const router = Router()

router.get('/productos', getProductos) // Ruta para conseguir todos los productos
router.post('/productos', createProducto) // Ruta para crear un producto
router.put('/productos/:id', updateProducto) // Ruta para Modificar un producto
router.delete('/productos/:id', deleteProducto) // Ruta para eliminar un producto
router.get('/productos/:id', getProducto) // Ruta para conseguir 1 producto

export default router