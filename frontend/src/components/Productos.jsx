import {Link} from 'react-router-dom';
import { deleteProducto} from "../services/productos.service";
import { useFetch } from "../hooks/useFetch.ts";

const URL = 'http://localhost:3001/productos'

function Productos(){
  const { data: productos, loading, error, refetch} = useFetch(URL)
  
  if(loading){
    return(
      <div className="loader-container">
          <div className="loader">Cargando Datos...</div>
      </div>
    )
  }

  if(error){
    return(<h2>UPS! Error al encontrar los datos: {error.message}</h2>)
  }
    const handleDeleteProducto = async (id) => {
      await deleteProducto(id)
      refetch()
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

export default Productos