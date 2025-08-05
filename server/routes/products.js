import express from 'express';
import axios from 'axios';
import db from '../db.js';

const router = express.Router();

// Fetch and store from dummyjson
router.get('/fetch-and-store-products', async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        const products = response.data.products;

        products.forEach(product => {
            const query = `
                INSERT INTO products (id, product)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE product = VALUES(product)
            `;
            db.query(query, [product.id, JSON.stringify(product)]);
        });

        res.send("Successfully fetched and stored!");
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).send("Failed to fetch products.");
    }
});

// Get products from database
router.get('/products', (req, res) => {
    const query = `SELECT * FROM products`;
    db.query(query, (err, result) => {
        if (err) {
            console.error("Database error!", err.stack);
            return res.status(500).json({ error: "Database query failed" });
        }

        const products = result.map(row => {
            if (typeof row.product === 'string') {
                return JSON.parse(row.product);
            }
            return row.product;
        });

        res.json({ products });
    });
});

export const productsRoutes = router;
