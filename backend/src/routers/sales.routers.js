const express = require('express');
const saleController = require('../controllers/sales.controller');

const routes = express.Router();
routes.get('/', saleController.getAllSale);
routes.get('/:id', saleController.getByIdSale);
routes.post('/', saleController.saleAdd);
routes.delete('/:id', saleController.deleteSale);
routes.put('/:saleId/products/:productId/quantity', saleController.updateSales);

module.exports = routes;