const salesModel = require('../models/sales.model');
const salesMiddlewares = require('../middlewares/validateSales');

const getAllSale = async () => {
  const result = await salesModel.getAllSale();
  return result;
};

const getByIdSale = async (id) => {
  const result = await salesModel.getByIdSale(id);
  if (salesMiddlewares.middleId(result)) return result;
  return 'error';
};

const checkSale = async (sale) => {
  const allSales = await getAllSale();
  const lastId = (allSales[allSales.length - 1].saleId) + 1;
  const result = { id: lastId, itemsSold: [] };
  const promises = [];

  for (let i = 0; i < sale.length; i += 1) {
    const promise = salesModel
    .saleAdd({ sId: lastId, pId: +sale[i].productId, q: +sale[i].quantity });
    promises.push(promise);
  }

  const element = await Promise.all(promises);

  for (let i = 0; i < element.length; i += 1) {
    const ele = element[i];
    result.itemsSold[i] = ele;
  }
  return result;
};

const saleAdd = async (sale) => {
  const validateSale = await salesMiddlewares.middleSaleQtd(sale);
  if (validateSale.message === 'ok') {
    const result = await checkSale(sale);
    return { type: 201, message: result };
  }
  return validateSale;
};

const deleteSale = async (id) => {
  const checkId = await salesModel.getByIdSale(id);
  if (checkId.length !== 0) {
    const result = await salesModel.deleteSale(id);
    return result;
  }
   return { type: 404, message: 'Sale not found' }; 
};

const updateSales = async (SId, PId, qtd) => {
  if (qtd <= 0) {
    return { type: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  if (!qtd) {
    return { type: 400, message: '"quantity" is required' };
  }
  const checkSaleId = await salesModel.getByIdSale(SId);
  if (checkSaleId.length !== 0) {
    if (!checkSaleId.some((sale) => sale.productId === +PId)) {
      return { type: 404, message: 'Product not found in sale' };
    }
  const result = await salesModel.updateSales(SId, PId, qtd);
  return result;
  }
  return { type: 404, message: 'Sale not found' }; 
};

module.exports = {
  getAllSale,
  getByIdSale,
  saleAdd,
  checkSale,
  deleteSale,
  updateSales,
};