const db = require("../config/database.js");

const CategoryController = {
    listAll(req, res) {
        let sql = 'SELECT * FROM category';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    getById(req, res) {
        let sql = 'SELECT * FROM category WHERE id = ?';
        db.query(sql, [req.params.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    },
    addCategory(req, res) {
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
    },
    updateCategory(req, res) {
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
    },
};

module.exports = CategoryController;