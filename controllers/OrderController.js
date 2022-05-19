const db = require("../config/database.js");

const OrderController = {
    addOrder(req, res) {
        let sql = 'INSERT INTO orders (user_id) VALUES (?)';
        db.query(sql, [req.body.user_id], (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

};


module.exports = OrderController;