const salesModel = require('../models/sales.model');

const validateQuantities = (req, res, next) => {
  const listProducts = req.body;
  const isQuantityMissing = listProducts.some((elem) => typeof elem.quantity !== 'number');

  if (isQuantityMissing) {
    return res.status(400).json({
      message: '"quantity" is required',
    });
  }

  next();
};

const validateProductExists = async (req, res, next) => {
  const listProducts = req.body;
  const allProductExistsPromises = listProducts.map(async (product) => {
    const productExists = await salesModel.getSalesById(product.productId);
    return !!productExists;
  });

  const resultsAllProducts = await Promise.all(allProductExistsPromises);
  const allProductExists = resultsAllProducts.every(Boolean);

  if (!allProductExists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const validateProductIds = async (req, res, next) => {
  const { body } = req;
  const areProductIdsPresent = body.every(({ productId }) => typeof productId !== 'undefined');

  if (!areProductIdsPresent) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  try {
    await validateProductExists(req, res, next);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const validateQuantityGreaterThanZero = (req, res, next) => {
  const listProducts = req.body;
  const isQuantityValid = listProducts
    .some(({ quantity }) => quantity !== undefined && quantity >= 1);

  if (!isQuantityValid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateQuantities,
  validateProductIds,
  validateProductExists,
  validateQuantityGreaterThanZero,
};