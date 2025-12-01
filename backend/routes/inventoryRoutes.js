const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/movements', authMiddleware, inventoryController.listMovements);

module.exports = router;
