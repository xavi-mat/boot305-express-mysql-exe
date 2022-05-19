const db = require("../config/database.js");

const DetailController = {
    addDetail(req, res) {
        const newDetail = [
            req.body.order_id,
            req.body.product_id,
            req.body.quantity
        ]
        let sql = 'INSERT INTO detail (order_id, product_id, quantity) VALUES (?)';
        db.query(sql, [newDetail], (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

};


module.exports = DetailController;