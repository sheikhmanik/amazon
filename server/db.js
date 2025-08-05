import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Database connected successfully.");
      connection.release();
    }
});

export default pool;