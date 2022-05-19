const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post('/', ProductController.addUser);
// router.get('/', ProductController.listAll);

module.exports = router;