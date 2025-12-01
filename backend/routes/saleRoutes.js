const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, saleController.createSale);
router.get('/', authMiddleware, saleController.listSales);

module.exports = router;
