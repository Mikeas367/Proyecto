import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { deleteProducto, getProductos } from "../services/productos.service";

function Productos(){
    const [productos, setProductos] = useState(null)

    useEffect(()=>{
        fetchProductos()
    },[])

    const fetchProductos = async ()=>{
        const productosDatos = await getProductos()
        setProductos(productosDatos)
    }

    const handleDeleteProducto = async (id) => {
      await deleteProducto(id)
      fetchProductos()
    }

    return (
        <div className="text-start">
          <h1 className="text-center">Listado De Productos</h1>
          <table className="table mt-5 table-striped">
            <thead className="table-dark">
              <tr>
                <th>Descripcion</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Stock</th>
                <th>Acciones</th>
                <th><Link className="btn text-white" to='/productos/0'><i className="bi bi-plus-circle"></i> Nuevo Producto</Link></th>
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
                        <button className="btn btn-default" onClick={() => handleDeleteProducto(p.id)} >
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                        <Link className="btn btn-default" to={`/productos/${p.id}`} >
                        <i className="bi bi-pencil text-primary"></i>
                        </Link>
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