const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get('/', UserController.listAll);
router.post('/', UserController.addUser);
router.put('/:id', UserController.updateUser);

module.exports = router;