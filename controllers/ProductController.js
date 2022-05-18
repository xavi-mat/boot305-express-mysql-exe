const db = require("../config/database.js");

const ProductController = {
    listAll(req, res) {
        let sql = 'SELECT * FROM product';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    listWithCategories(req, res) {
        let sql = `SELECT p.*, c.name AS cat FROM product p
            LEFT JOIN category c ON p.idCategory=c.id`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    getById(req, res) {
        let sql = `SELECT p.*, c.name AS cat FROM product p
            LEFT JOIN category c ON p.idCategory = c.id
            WHERE p.id = ?`;
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    },
    searchByName(req, res) {
        let sql = `SELECT p.*, c.name AS cat FROM product p
            LEFT JOIN category c ON p.idCategory = c.id
            WHERE p.name LIKE ?`;
        db.query(sql, [`%${req.params.name}%`], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    },
    listDescending(req, res) {
        const sql = 'SELECT p.*, c.name AS cat FROM product p LEFT JOIN category c ON p.idCategory=c.id ORDER BY p.name DESC';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    addPost(req, res) {
        // Check product data
        const newProduct = [
            req.body.name,
            req.body.description ? req.body.description : null,  // if empty, put null
            req.body.idCategory ? req.body.idCategory : null,  // if empty, put null
        ];
        if (req.body.name) {
            const sql = `INSERT INTO product (name, description, idCategory) VALUES (?)`;
            db.query(sql, [newProduct], (err, result) => {
                if (err) throw err;
                console.log(result);
                res.status(201).send('Product inserted.');
            });

        } else {
            res.send('Product name is required.');
        }
    },
    updateById(req, res) {
        // Check product data
        const product = {
            name: req.body.name,
            description: req.body.description ? req.body.description : null,  // if empty, put null
            idCategory: req.body.idCategory ? req.body.idCategory : null,  // if empty, put null
        };
        if (req.body.name) {
            const sql = `UPDATE product SET ? WHERE id=?`;
            db.query(sql, [product, req.params.id], (err, result) => {
                if (err) throw err;
                console.log(result);
                res.send('Product updated.');
            });
        } else {
            res.send('Product name is required.');
        }
    },
    delete(req, res) {
        let sql = `DELETE FROM product WHERE id = ?`;
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result.affectedRows ? 'Product deleted' : 'Product not found');
        });
    }
};


module.exports = ProductController;