const db = require("../config/database.js");

const UserController = {
    addUser(req, res) {
        const newUser = [
            req.body.name,
            req.body.email,
            req.body.bio
        ]
        let sql = 'INSERT INTO user (name, email, bio) VALUES (?)';
        db.query(sql, [newUser], (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    updateUser(req, res) {
        let sql = 'UPDATE user SET ? WHERE id = ?';
        db.query(sql, [req.body, req.params.id], (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    listAll(req, res) {
        let sql = 'SELECT * FROM user';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    listAllWithOrders(req, res) {
        let sql = 'SELECT * FROM user';
        let finalResult = [];
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(finalResult);
        })
    }
};


module.exports = UserController;