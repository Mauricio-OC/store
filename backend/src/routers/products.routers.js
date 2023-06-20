const express = require('express');
const productController = require('../controllers/products.controller');

const routes = express.Router();
routes.get('/', productController.getAllProduct);
routes.get('/search', productController.searchProductByName);
routes.get('/:id', productController.getByIdProduct);
routes.post('/', productController.addProduct);
routes.put('/:id', productController.updateProductById);
routes.delete('/:id', productController.deleteProduct);

module.exports = routes;