import {useState} from 'react';
import {useFetch} from '../hooks/useFetch.ts';

const Venta = () => {
    const URL = 'http://localhost:3001/productos';
    const { data: productos, loading, error } = useFetch(URL);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cantidad, setCantidad] = useState(0);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader">Cargando Datos...</div>
            </div>
        );
    }

    if (error) {
        return (<h2 className="bg-danger text-white p-3">UPS! Error: {error.message}</h2>);
    }

    const handleProductoChange = (e) => {
        const productoId = e.target.value; 
        console.log("ESTO", e.target.value)
        const producto = productos.find(p => p.id === parseInt(productoId));
        setSelectedProduct(producto); 
        setCantidad(0); 
    };

    const handleCantidadChange = (e) => {
        setCantidad(e.target.value);
    };

    return (
        <>
            <h1 className="text-center my-4">Nueva Venta</h1>
            <form className="mt-5 p-4 bg-light rounded shadow-sm border">
                <div className="mb-3">
                    <label className="form-label">Seleccione el Producto</label>
                    <select className="form-select" aria-label="Seleccione un producto" onChange={handleProductoChange}>
                        <option selected>Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.descripcion} - ${producto.precio_unitario}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedProduct && (
                    <div className="alert alert-primary">
                        Stock disponible: {selectedProduct.stock} unidades
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Ingrese la Cantidad</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        placeholder="Ingrese la cantidad" 
                        value={cantidad}
                        onChange={handleCantidadChange}
                        min={1} 
                        max={selectedProduct ? selectedProduct.stock : 0} 
                        disabled={!selectedProduct}
                    />
                </div>

                <div className="d-grid gap-2">
                    <button className="btn btn-success" type="submit" disabled={!selectedProduct || cantidad <= 0}>
                        Aceptar
                    </button>
                </div>
            </form>
        </>
    );
};

export default Venta;
