const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get('/', ProductController.listAll);
router.get('/categories', ProductController.listWithCategories);
router.get('/id/:id', ProductController.getById);
router.get('/search/:name', ProductController.searchByName);
router.get('/desc', ProductController.listDescending);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateById);
router.delete('/:id', ProductController.delete);

module.exports = router;