import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

function Productos(){
    const [productos, setProductos] = useState(null)

    useEffect(()=>{
        getProductos()
    })

    const getProductos = async ()=>{
        const productosDatos = await axios.get("http://localhost:3001/productos")
        setProductos(productosDatos.data)
    }

    const deleteProducto = async (id) => {
        if (window.confirm("¿Esta seguro de eliminar el producto?")){
            await axios.delete(`http://localhost:3001/productos/${id}`)
            getProductos()
        }
    }

    return (
        <div className="text-start">
          <h1 className="text-center">Listado De Productos</h1>
          <table className="table mt-5">
            <thead className="table-dark">
              <tr>
                <th>Descripcion</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos &&
                productos.map((p) => {
                  return (
                    <tr key={p.id}>
                      <td>{p.descripcion}</td>
                      <td>{p.precio_compra}</td>
                      <td>{p.precio_unitario}</td>
                      <td>{p.stock}</td>
                      <td>
                        <button className="btn btn-default" onClick={() => deleteProducto(p.id)} >
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )
}

export default Productos