const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post('/', UserController.addUser);
// router.get('/', UserController.listAll);

module.exports = router;