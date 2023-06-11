const productModel = require('../models/products.model');

const getAll = async () => {
  const result = await productModel.getAll();
  return result;
};

const findById = async (id) => {
  const result = await productModel.findById(id);
  if (!result) {
    return false;
  }
  return result;
};

module.exports = {
  getAll,
  findById,
};