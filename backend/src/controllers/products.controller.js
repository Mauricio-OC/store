const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const products = await productService.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const parsedId = Number(id);
  const product = await productService.getProductById(parsedId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};
const createProduct = async (req, res) => {
  const { name } = req.body;
  const createdProduct = await productService.createProduct(name);
  return res.status(201).json(createdProduct.result);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
