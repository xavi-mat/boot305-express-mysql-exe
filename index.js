////////////////////////////////////////////////////////////////////////////////
// MySQL and Express - Exercise
// for The Bridge
// by  xavimat
// 2022-05-18
//
////////////////////////////////////////////////////////////////////////////////
// Imports
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/database');

////////////////////////////////////////////////////////////////////////////////
// Constants
const port = 3000;

////////////////////////////////////////////////////////////////////////////////
// Middlewares
app.use(express.json());
app.use(cors());

////////////////////////////////////////////////////////////////////////////////
// Routes
app.use('/categories', require('./routes/categories'))
app.use('/products', require('./routes/products'));

////////////////////////////////////////////////////////////////////////////////
// API endpoints
app.get('/createTable/:name', (req, res) => {
    let sql;
    switch (req.params.name) {
        case 'product':
            sql = `CREATE TABLE product (
                id INT AUTO_INCREMENT,
                name VARCHAR(45) NOT NULL,
                description VARCHAR(300),
                idCategory INT,
                PRIMARY KEY (id),
                FOREIGN KEY (idCategory) REFERENCES category(id)
                    ON DELETE SET NULL
                    ON UPDATE CASCADE
            )`;
            break;

        case 'category':
            sql = `CREATE TABLE category (
                id INT AUTO_INCREMENT,
                name VARCHAR(45) NOT NULL,
                PRIMARY KEY (id)
            )`;
            break;

        default:
            res.status(400).send("Invalid Table Name");
            return;
    }

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`Table ${req.params.name} created.`)
    });
});



////////////////////////////////////////////////////////////////////////////////
// Listen
app.listen(port, () => { console.log(`Server up in port ${port}!`); });
