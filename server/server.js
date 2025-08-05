import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { productsRoutes } from './routes/products.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['https://amazon-dnzu.onrender.com'],
    credentials: true
}));
app.use(express.json()); // To parse incoming JSON

app.use('/api', productsRoutes);

// Use dynamic port for Render
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
