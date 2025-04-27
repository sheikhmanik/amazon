const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db');

router.use('/fetch-and-store-products', async (req, res) => {
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;
    products.forEach(product => {
        const query = `
            INSERT INTO products (id, product)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE product = VALUES(product)
        `;
        db.query(query, [product.id, JSON.stringify(product)]);
    })
    res.send("Succesfully fetched and stored!")
})

router.use('/products', (req, res) => {
    const query = `SELECT * FROM products`;
    db.query(query, (err, result) => {
        if (err) {
            console.log("Database error!", err.stack);
            return;
        }
        const products = result.map(row => {
            if (typeof row.product === 'string') {
                return JSON.parse(row.product)
            }
            return row.product;
        })
        res.json({products});
    })
})

module.exports = router;