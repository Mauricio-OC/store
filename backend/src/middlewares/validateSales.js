const productsModel = require('../models/product.model');

const middleId = (result) => {
  if (result.length !== 0) {
    return true;
  }
};

const middleSales = async (sale) => {
  const promises = [];
  for (let i = 0; i < sale.length; i += 1) {
    const promise = productsModel.getByIdProduct(sale[i].productId);
    promises.push(promise);
  }
  const results = await Promise.all(promises);
  return !results.includes('erro');
};

const middleSaleQtd = async (sale) => {
  if (sale.some((s) => !s.productId)) return { type: 400, message: '"productId" is required' };
  if (sale.some((s) => +s.quantity <= 0)) {
    return { type: 422, message: '"quantity" must be greater than or equal to 1' }; 
   }
  if (sale.some((s) => !s.quantity)) return { type: 400, message: '"quantity" is required' };
  const results = await middleSales(sale);
  if (!results) {
    return { type: 404, message: 'Product not found' }; 
  } return { type: 200, message: 'ok' };
  };

module.exports = {
  middleId,
  middleSaleQtd,
  middleSales,
};