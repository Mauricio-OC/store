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

module.exports = {
  getAllProducts,
  getProductById,
};
// const createProduct = async (product) => {
//   const insert = await listProducts.createProduct(product);
//   return { result: insert };
// };

// const deleteProduct = async (id) => {
//   const verifyProduct = await listProducts.getById(id);
//   console.log(verifyProduct);
//   if (verifyProduct === undefined) {
//     return false;
//   }
//   await listProducts.deleteProduct(id);
//   return true;
// };
