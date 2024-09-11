import Navbar from "./components/Navbar";
import {Routes, Route}  from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Inicio from "./components/Inicio";
import Productos from "./components/Productos";
import 'bootstrap-icons/font/bootstrap-icons.css'
import Producto from "./components/Producto";
import Venta from "./components/venta";


function App() {
  return (
    <>
      <Navbar/>
      <div className='container text-center'>
        <Routes>
          <Route path='/' element={<Inicio></Inicio>} />
          <Route path="/productos" element={<Productos/>} />
          <Route path="/productos/:id" element={<Producto/>}/>
          <Route path="/nueva-venta" element={<Venta/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
