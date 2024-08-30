import axios from "axios";

const URL = 'http://localhost:3001/productos'

export const getProductos = async ()=>{
    const productosDatos = await axios.get(URL)
    return productosDatos.data
}

export const deleteProducto = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar el producto?")){
        await axios.delete(`${URL}/${id}`)
    }
}

export const getProducto = async(id) => {
    const productoDatos = await axios.get(`${URL}/${id}`)
    return productoDatos.data
}



export const createProducto = async (data) => {
    const response = await axios.post(URL, data);
    return response.data;
}


export const updateProducto = async (id, data) => {
    const response = await axios.put(`${URL}/${id}`, data);
    return response.data;
}