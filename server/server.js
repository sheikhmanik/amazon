import dotenv from "dotenv";
dotenv.config();

const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/products');

const app = express();

app.use(cors());

app.use('/api', productsRoutes);

app.listen(3000, () => {
    console.log("Server started at port 3000.")
})