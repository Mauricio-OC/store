const productService = require('../services/product.service');

const getAllProduct = async (_req, res) => {
  const data = await productService.getAllProduct();
  return res.status(200).json(data);
};

const getByIdProduct = async (req, res) => {
  const { id } = req.params;
  const data = await productService.getByIdProduct(id);
  if (data !== 'error') return res.status(200).json(data);
  return res.status(404).json({ message: 'Product not found' });
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.addProduct(name);
  if (type === 201) { return res.status(type).json(message); }
  return res.status(type).json({ message });
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProductById(id, name);
  if (type === 200) { return res.status(type).json(message); }
  return res.status(type).json({ message });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);
  if (type === 204) { return res.status(type).json(); }
  return res.status(type).json({ message });
};

const searchProductByName = async (req, res) => {
  const search = req.query.q;
  const { type, message } = await productService.searchProductByName(search);
  if (type === 200) { return res.status(type).json(message); }
  return res.status(type).json({ message });
};

module.exports = {
  getAllProduct,
  getByIdProduct,
  addProduct,
  updateProductById,
  deleteProduct,
  searchProductByName,
};