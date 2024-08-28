import express from 'express'
import productosRouter from './routes/productos.routes.js';

const app = express();

//middlewares
app.use(express.json())

app.use(productosRouter)

export default app;