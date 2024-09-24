import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { deleteProducto, getProductos } from "../services/productos.service";

function Productos2(){
    const [productos, setProductos] = useState(null)

    useEffect(()=>{
        fetchProductos()
    },[])

    const fetchProductos = async () =>{
        const productosDatos = await getProductos()
        setProductos(productosDatos)
    }

    const handleDeleteProducto = async (id) => {
      await deleteProducto(id)
      fetchProductos()
    }

    return (
      <div className="container my-5 p-4 bg-light rounded shadow-sm">
      <h1 className="text-center mb-4 text-primary">Listado De Productos</h1>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-primary text-white">
            <tr>
              <th>Descripción</th>
              <th>Precio de Compra</th>
              <th>Precio de Venta</th>
              <th>Stock</th>
              <th>Acciones</th>
              <th>
                <Link className="btn btn-success text-white" to='/productos/0'>
                  <i className="bi bi-plus-circle me-2"></i>Nuevo Producto
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {productos && productos.map((p) => (
              <tr key={p.id} className="align-middle">
                <td>{p.descripcion}</td>
                <td>{p.precio_compra}</td>
                <td>{p.precio_unitario}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="btn btn-outline-danger me-2" onClick={() => handleDeleteProducto(p.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                  <Link className="btn btn-outline-primary" to={`/productos/${p.id}`}>
                    <i className="bi bi-pencil"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
      )
}

export default Productos2