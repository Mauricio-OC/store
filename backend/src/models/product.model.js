const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};
const INSERT_PRODUCT_QUERY = 'INSERT INTO products (name) VALUES (?)';

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(INSERT_PRODUCT_QUERY, [name]);
  return { id: insertId, name };
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};

// const deleteProduct = async (id) => {
//   const query = 'DELETE FROM StoreManager.products WHERE id = ?';
//   await connection.execute(query, [id]);
// };
