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
    // listAll(req, res) {
    //     let sql = 'SELECT * FROM user';
    //     db.query(sql, (err, result) => {
    //         if (err) throw err;
    //         res.send(result);
    //     });
    // },
};


module.exports = UserController;