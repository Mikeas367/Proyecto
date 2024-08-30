import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProducto, createProducto, updateProducto } from '../services/productos.service'; // Importa las funciones necesarias

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
    <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
      <h1 className='mb-5'>{id > 0 ? producto.descripcion : 'Nuevo Producto'}</h1>

      <div className="row mt-3">
        <div className="col-4 text-end">
          <label htmlFor="descripcion">Descripción del Producto:</label>
        </div>
        <div className="col-8 text-start">
          <input
            type="text"
            className='form-control'
            {...register('descripcion', { required: 'La descripción es requerida' })}
          />
          {errors.descripcion && <span className='text-danger'>{errors.descripcion.message}</span>}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-4 text-end">
          <label htmlFor="precio_compra">Precio de Compra:</label>
        </div>
        <div className="col-8 text-start">
          <input
            type="text"
            className='form-control'
            {...register('precio_compra', {
              required: 'El precio de compra es requerido',
              validate: value => !isNaN(value) || 'Debe ser numérico'
            })}
          />
          {errors.precio_compra && <span className='text-danger'>{errors.precio_compra.message}</span>}
        </div>
      </div>


      <div className="row mt-3">
        <div className="col-4 text-end">
          <label htmlFor="precio_unitario">Precio de Venta:</label>
        </div>
        <div className="col-8 text-start">
          <input
            type="text"
            className='form-control'
            {...register('precio_unitario', {
              required: 'El precio es requerido',
              validate: value => !isNaN(value) || 'Debe ser numérico'
            })}
          />
          {errors.precio_unitario && <span className='text-danger'>{errors.precio_unitario.message}</span>}
        </div>
      </div>


      <div className="row mt-3">
        <div className="col-4 text-end">
          <label htmlFor="stock">Cantidad en Stock:</label>
        </div>
        <div className="col-8 text-start">
          <input
            type="text"
            className='form-control'
            {...register('stock', {
              required: 'La cantidad en stock es requerida',
              validate: value => !isNaN(value) || 'Debe ser numérico'
            })}
          />
          {errors.stock && <span className='text-danger'>{errors.stock.message}</span>}
        </div>
      </div>

      <div className="mt-5 mb-5">
        <button className='btn btn-danger ms-2' onClick={cancelar}>Cancelar</button>
        <input className="btn btn-success ms-2" type="submit" value={id > 0 ? 'Actualizar' : 'Crear'} />
      </div>
    </form>
  );
}

export default Producto;
