import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProducto, createProducto, updateProducto } from '../services/productos.service'; 

function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    if (id > 0) {
      cargarProducto(id);
    }
  }, [id]);

  const cargarProducto = async (id) => {
    try {
      const data = await getProducto(id);
      setProducto(data);
      reset(data); // Actualiza el formulario con los datos recibidos
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  };

  const volver = () => navigate('/productos');

  const cancelar = (e) => {
    e.preventDefault();
    volver();
  };

  const onSubmit = async (data) => {
    try {
      if (id > 0) {
        await updateProducto(id, data);
      } else {
        await createProducto(data);
      }
      volver();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-4 bg-light rounded shadow-sm">
  <h1 className="mb-5 text-center text-primary">{id > 0 ? producto.descripcion : 'Nuevo Producto'}</h1>

  {/* Descripción del Producto */}
  <div className="row mb-3">
    <div className="col-md-4 text-end">
      <label htmlFor="descripcion" className="form-label fw-bold">Descripción del Producto:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Introduce la descripción"
        {...register('descripcion', { required: 'La descripción es requerida' })}
      />
      {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
    </div>
  </div>

  {/* Precio de Compra */}
  <div className="row mb-3">
    <div className="col-md-4 text-end">
      <label htmlFor="precio_compra" className="form-label fw-bold">Precio de Compra:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Introduce el precio de compra"
        {...register('precio_compra', {
          required: 'El precio de compra es requerido',
          validate: value => !isNaN(value) || 'Debe ser numérico'
        })}
      />
      {errors.precio_compra && <span className="text-danger">{errors.precio_compra.message}</span>}
    </div>
  </div>

  {/* Precio de Venta */}
  <div className="row mb-3">
    <div className="col-md-4 text-end">
      <label htmlFor="precio_unitario" className="form-label fw-bold">Precio de Venta:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Introduce el precio de venta"
        {...register('precio_unitario', {
          required: 'El precio es requerido',
          validate: value => !isNaN(value) || 'Debe ser numérico'
        })}
      />
      {errors.precio_unitario && <span className="text-danger">{errors.precio_unitario.message}</span>}
    </div>
  </div>

  {/* Cantidad en Stock */}
  <div className="row mb-4">
    <div className="col-md-4 text-end">
      <label htmlFor="stock" className="form-label fw-bold">Cantidad en Stock:</label>
    </div>
    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Introduce la cantidad en stock"
        {...register('stock', {
          required: 'La cantidad en stock es requerida',
          validate: value => !isNaN(value) || 'Debe ser numérico'
        })}
      />
      {errors.stock && <span className="text-danger">{errors.stock.message}</span>}
    </div>
  </div>

  {/* Botones de Acción */}
  <div className="d-flex justify-content-center">
    <button className="btn btn-outline-danger me-2" onClick={cancelar}>Cancelar</button>
    <input className="btn btn-success ms-2" type="submit" value={id > 0 ? 'Actualizar' : 'Crear'} />
  </div>
</form>

  );
}

export default Producto;
