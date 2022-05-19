const express = require("express");
const DetailController = require("../controllers/DetailController");
const router = express.Router();

router.post('/', DetailController.addDetail);

module.exports = router;