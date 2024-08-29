import express from 'express'
import productosRouter from './routes/productos.routes.js';
import cors from 'cors';

const app = express();

//middlewares
app.use(cors())
app.use(express.json())

app.use(productosRouter)

export default app;