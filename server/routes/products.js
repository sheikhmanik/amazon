import express from 'express';
import axios from 'axios';
import db from '../db.js';

const router = express.Router();

// Main route: fetch from DB, auto-fetch & store if empty
router.get('/products', async (req, res) => {
    const query = `SELECT * FROM products`;

    db.query(query, async (err, result) => {
        if (err) {
            console.error("Database error!", err.stack);
            return res.status(500).json({ error: "Database query failed" });
        }

        // If products table is empty, fetch from dummyjson and store
        if (result.length === 0) {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                const products = response.data.products;

                products.forEach(product => {
                    const insertQuery = `
                        INSERT INTO products (id, product)
                        VALUES (?, ?)
                        ON DUPLICATE KEY UPDATE product = VALUES(product)
                    `;
                    db.query(insertQuery, [product.id, JSON.stringify(product)]);
                });

                console.log("✅ Products fetched and stored from dummyjson.");

                // Send freshly fetched products as response
                return res.json({ products });

            } catch (fetchErr) {
                console.error("Error fetching from dummyjson:", fetchErr.message);
                return res.status(500).json({ error: "Failed to fetch products from external source" });
            }
        }

        // If data exists, return it
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
