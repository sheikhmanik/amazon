const mysql = require('mysql2');

const port = process.env.PORT || 5000;
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.err("Database error!", err.stack)
    } else {
        console.log("Database connected!")
    }
})

module.exports = db;