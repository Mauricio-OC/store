const express = require('express');
const { validateProductName, validateNameMinLength } = require('../middlewares/validateName');

const router = express.Router();
const productController = require('../controllers/products.controller');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProductName, validateNameMinLength, productController.createProduct);

module.exports = router;