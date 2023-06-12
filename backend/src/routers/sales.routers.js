const express = require('express');

const salesProducts = express.Router();
const controller = require('../controllers/sales.controller');
const {
  validateProductIds,
  validateQuantities,
  validateProductExists,
  validateQuantityGreaterThanZero,

} = require('../middlewares/validateSales');

salesProducts.route('/')
  .get(controller.getAllSales);

salesProducts.route('/:id')
  .get(controller.getSalesById);

  salesProducts.route(
    '/:',
  validateProductIds,
   validateQuantities,
    validateProductExists,
     validateQuantityGreaterThanZero,
     )
  .post(controller.createNewSales);

module.exports = salesProducts;
