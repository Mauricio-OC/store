const salesServices = require('../services/sales.service');

const getAllSale = async (_req, res) => {
  const data = await salesServices.getAllSale();
  return res.status(200).json(data);
};

const getByIdSale = async (req, res) => {
  const { id } = req.params;
  const data = await salesServices.getByIdSale(id);
  if (data !== 'error') return res.status(200).json(data);
  return res.status(404).json({ message: 'Sale not found' });
};

const saleAdd = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesServices.saleAdd(sale);
  if (type === 201) return res.status(type).json(message);
  return res.status(type).json({ message });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.deleteSale(id);
  if (type === 204) { return res.status(type).json(); }
  return res.status(type).json({ message });
};

const updateSales = async (req, res) => {
  const { saleId, productId } = req.params;
  const qtd = req.body.quantity;
  const { type, message } = await salesServices.updateSales(saleId, productId, qtd);
  if (type === 200) { return res.status(type).json(message); }
  return res.status(type).json({ message });
};

module.exports = {
  getAllSale,
  getByIdSale,
  saleAdd,
  deleteSale,
  updateSales,
};