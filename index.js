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
const SQL_CREATE = {
    product: `CREATE TABLE product (
        id INT AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        description VARCHAR(300),
        idCategory INT,
        PRIMARY KEY (id),
        FOREIGN KEY (idCategory) REFERENCES category(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE
    )`,
    category: `CREATE TABLE category (
        id INT AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        PRIMARY KEY (id)
    )`,
    user: `CREATE TABLE user (
        id INT AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        email VARCHAR(45) UNIQUE NOT NULL,
        bio TEXT,
        PRIMARY KEY (id)
    )`,
    order: `CREATE TABLE order (
        id INT AUTO_INCREMENT,
        user_id INT NOT NULL,
        date DATE DEFAULT CURRENT_DATE(),
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
    )`,
    detail: `CREATE TABLE detail (
        order_id INT,
        product_id INT,
        quantity INT NOT NULL,
        PRIMARY KEY (order_id, product_id)
        FOREIGN KEY (order_id) REFERENCES order(id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        FOREIGN KEY (product_id) REFERENCES product(id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
    )`

}
////////////////////////////////////////////////////////////////////////////////
// Middlewares
app.use(express.json());
app.use(cors());

////////////////////////////////////////////////////////////////////////////////
// Routes
app.use('/categories', require('./routes/categories'))
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));

////////////////////////////////////////////////////////////////////////////////
// API endpoints
app.get('/createTable/:name', (req, res) => {
    let sql;
    switch (req.params.name) {
        case 'product':  sql = SQL_CREATE.product;  break;
        case 'category': sql = SQL_CREATE.category; break;
        case 'user':     sql = SQL_CREATE.user;     break;
        case 'order':    sql = SQL_CREATE.order;    break;
        case 'detail':   sql = SQL_CREATE.detail;   break;
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
