const salesService = require('../services/sales.service');

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesService.getSalesById(id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createNewSales = async (req, res) => {
  const listProducts = req.body;

  try {
    const { result } = await salesService.createNewSales(listProducts);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// const deleteSale = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await salesService.deleteSale(id);

//     if (result.message === 'done') {
//       return res.status(204).end();
//     }

//     return res.status(404).json({ message: result.message });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

module.exports = { 
  getAllSales,
  getSalesById,
  createNewSales,
};