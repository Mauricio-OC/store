const express = require('express');

const salesProducts = express.Router();
const controller = require('../controllers/sales.controller');

salesProducts.route('/')
  .get(controller.getAllSales);

salesProducts.route('/:id')
  .get(controller.getSalesById);

module.exports = salesProducts;
