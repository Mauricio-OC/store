const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) {
    return false;
  }
  return product;
};
const createProduct = async (product) => {
  const insert = await productModel.createProduct(product);
  return { type: 201, result: insert };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};

// const deleteProduct = async (id) => {
//   const verifyProduct = await producModel.getById(id);
//   console.log(verifyProduct);
//   if (verifyProduct === undefined) {
//     return false;
//   }
//   await listProducts.deleteProduct(id);
//   return true;
// };
