const productsService = require('../services/product.service');

const getAll = async (_req, res) => {
    const result = await productsService.getAll();
  
    return res.status(200).json(result);
  };

const findById = async (req, res) => {
    const { id } = req.params;
    const result = await productsService.findById(id);
    if (!result) {
        return res.status(404).json({ message: 'Product Not found' });
    }
    return res.status(200).json(result);
};

module.exports = {
    getAll,
    findById,
};