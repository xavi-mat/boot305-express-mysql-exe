const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

router.get('/', CategoryController.listAll);
router.get('/id/:id', CategoryController.getById);
router.post('/', CategoryController.addCategory);
router.put('/:id', CategoryController.updateCategory);

module.exports = router;