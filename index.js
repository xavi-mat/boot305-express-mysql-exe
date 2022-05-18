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


// CATEGORIES
app.get('/categories', (req, res) => {
    let sql = 'SELECT * FROM category';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/category/:id', (req, res) => {
    let sql = 'SELECT * FROM category WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.post('/category/', (req, res) => {
    if (req.body.name) {
        const sql = `INSERT INTO category (name) VALUES (?)`;
        db.query(sql, [req.body.name], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.status(201).send('Category inserted.');
        });

    } else {
        res.send('Category name is required.');
    }
});

app.put('/category/:id', (req, res) => {
    if (req.body.name) {
        const sql = `UPDATE category SET name=? WHERE id=?`;
        db.query(sql, [req.body.name, req.params.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Category updated.`);
        });
    } else {
        res.send('Category name is required.');
    }
})

// PRODUCTS
app.use('/products', require('./routes/products'));


////////////////////////////////////////////////////////////////////////////////
// Listen
app.listen(port, () => { console.log(`Server up in port ${port}!`); });
