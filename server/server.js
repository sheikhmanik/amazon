import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { productsRoutes } from './routes/products.js';
dotenv.config();

const app = express();

app.use(cors());

app.use('/api', productsRoutes);

app.listen(3000, () => {
    console.log("Server started at port 3000.")
})