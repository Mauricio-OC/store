const { Router } = require('express');

const productsController = require('../controllers/products.controller');

const router = Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.findById);

module.exports = router;
