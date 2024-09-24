import { useFetch } from '../hooks/useFetch.ts';

const Venta = () => {
    const { data: productos, loading, error} = useFetch(URL)
  
    if(loading){
        return(
        <div className="loader-container">
            <div className="loader">Cargando Datos...</div>
        </div>
        )
    }

    if(error){
        return(<h2 className='bg-danger'>UPS! Error: {error.message}</h2>)
    }



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
            {console.log(new Date().toISOString())}
            <input className="rounded" type='number' placeholder='Ingrese La Cantidad'></input>  
            <input className='btn btn-success' type='submit' value={'Aceptar'}></input>     
        </form>
    );
};

export default Venta;
