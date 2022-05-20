const db = require("../config/database.js");

const OrderController = {
    addOrder(req, res) {
        let sql = 'INSERT INTO orders (user_id) VALUES (?)';
        db.query(sql, [req.body.user_id], (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    listAll(req, res) {
        let sql = 'SELECT * FROM orders LEFT JOIN detail ON orders.id=detail.order_id';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    }
};


module.exports = OrderController;