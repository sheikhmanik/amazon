const sql = require('mysql2');

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'amazon'
})

db.connect(err => {
    if (err) {
        console.err("Database error!", err.stack)
    } else {
        console.log("Database connected!")
    }
})

module.exports = db;