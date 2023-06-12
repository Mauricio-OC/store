const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) {
    return false;
  }
  return sales;
};

module.exports = {
  getAllSales,
  getSalesById,
};

// const createNewSales = async (product) => {
//   const saleId = await salesModel.newSalesProducts(product);
//   if (saleId) {
//     return { type: 201, result: saleId };
//   }
// };

// const deleteSale = async (id) => {
//   const verifySale = await getById(id);
//   if (!verifySale) {
//     return { message: 'Sale not found' };
//   }
//   await salesModel.deleteSale(id);
//   return { message: 'done' };
// };

module.exports = { 
  getAllSales,
  getSalesById,
};