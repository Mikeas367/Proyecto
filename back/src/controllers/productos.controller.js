import { Producto } from "../models/producto.js"

export const getProductos = async(req, res) => {
    try {
        const productos = await Producto.findAll()
        res.json(productos)
    } catch (error) {
        return res.status(500).json({message: message.error})
    }
    
}

export const getProducto = async (req, res) =>{
    try {
        const {id} = req.params
        const producto = await Producto.findByPk(id)
        res.json(producto)
    } catch (error) {
        return res.status(500).json({message: message.error})
    }
}

export const createProducto = async (req, res) => {
    const {precio_unitario, precio_compra, descripcion, stock} = req.body
    try {
        const newProducto = await Producto.create({
            precio_unitario, 
            precio_compra,
            descripcion,
            stock
        })
        res.json(newProducto)

    } catch (error) {
        return res.status(500).json({message: message.error})
    }
}

export const updateProducto = async (req, res) =>{
    try {
        const {id} = req.params
        const {precio_unitario, precio_compra, descripcion, stock} = req.body
        const producto = await Producto.findByPk(id) // Busco el Proyecto a editar, para luego modificarle los valores con el req.body
        producto.precio_unitario = precio_unitario
        producto.precio_compra = precio_compra
        producto.descripcion = descripcion
        producto.stock = stock
        await producto.save()
        res.json(producto)
    } catch (error) {
        return res.status(500).json({message: message.error})
    }

}

export const deleteProducto = async (req, res) =>{
    try {
        //console.log(req.params.id)
        const {id} = req.params 
        
        await Producto.destroy({
            where:{
                id,
            }
        })
        res.sendStatus(204)// informo que se ejecuto bien con un 204

    } catch (error) {
        return res.status(500).json({message: message.error})
    }
}

