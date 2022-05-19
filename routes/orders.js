const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router();

router.post('/', OrderController.addOrder);

module.exports = router;