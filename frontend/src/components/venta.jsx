import React, { useEffect, useState } from 'react';
import { getProductos } from '../services/productos.service.js'; // Asegúrate de importar tu función

const Venta = () => {
    const [productos, setProductos] = useState([])

    useEffect(()=>{
        fetchProductos()
    },[])

    const fetchProductos = async () =>{
        const productosDatos = await getProductos()
        setProductos(productosDatos)
    }

    // Funcion para verificar si es numerico el campo de cant
    const [cantidad, setCantidad] = useState('');
    const [error, setError] = useState('');

  const validarCantidad = (valor) => {
    // Comprobar si es un número
    if (!/^\d*$/.test(valor)) {
      setError('La cantidad debe ser un número válido.');
    } 
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCantidad(value);
    validarCantidad(value);
  };


  return (
    <form className="mt-5 p-4 bg-light rounded shadow-sm">
        <select className="form-select " aria-label="Default select example">
            <option selected>Seleccione un producto</option>
            {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                    {producto.descripcion} 
                </option>
            ))}
        </select>
        {/* INGRESO CANT*/}
        <div className="row mb-4">
            <div className="col-md-4 text-end">
                <label htmlFor="stock" className="form-label fw-bold">Ingrese la cantidad:</label>
            </div>
            <div className="col-md-6">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Introduce la cantidad del producto seleccionado"
                    value={cantidad}
                    onChange={handleChange}
                />
                {error && <p className="text-danger">{error}</p>} {/* Mostrar mensaje de error */}
            </div>
        </div>
    </form>
  );
};

export default Venta;
