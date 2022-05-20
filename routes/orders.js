const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router();

router.post('/', OrderController.addOrder);
router.get('/', OrderController.listAll);

module.exports = router;