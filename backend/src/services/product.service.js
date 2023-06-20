const productsModel = require('../models/product.model');
const productsMiddlewares = require('../middlewares/validateName');

const getAllProduct = async () => {
  const result = await productsModel.getAllProduct();
  return result;
};

const getByIdProduct = async (id) => {
  const result = await productsModel.getByIdProduct(id);
  if (productsMiddlewares.middleId(result)) return result;
  return 'error';
};

const addProduct = async (name) => {
  const validName = productsMiddlewares.middleName(name);
  if (validName.type === 200) {
    const result = await productsModel.addProduct(name);
    return result;
  }
  return validName;
};                                          

const updateProductById = async (id, name) => {
  const validName = productsMiddlewares.middleName(name);
  const checkId = await productsModel.getByIdProduct(id);
  if (validName.type === 200 && checkId !== 'erro') {
    const result = await productsModel.updateProductById(id, name);
    return result; 
  } if (validName.type === 200 && checkId === 'erro') {
     return { type: 404, message: 'Product not found' }; 
  }
  return validName;
};

const deleteProduct = async (id) => {
  const checkId = await productsModel.getByIdProduct(id);
  if (checkId !== 'erro') {
    const result = await productsModel.deleteProduct(id);
    return result;
  }
   return { type: 404, message: 'Product not found' }; 
};

const searchProductByName = async (searchName) => {
  const result = await productsModel.searchProductByName(searchName);
  return result;
};

module.exports = {
  getAllProduct,
  getByIdProduct,
  addProduct,
  updateProductById,
  deleteProduct,
  searchProductByName,
};