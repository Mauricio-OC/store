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

module.exports = {
  getAllProducts,
  getProductById,
};
// const createProduct = async (name) => {
//   const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUE (?)', [name]);
//   return { id: insertId, name };
// };

// const deleteProduct = async (id) => {
//   const query = 'DELETE FROM StoreManager.products WHERE id = ?';
//   await connection.execute(query, [id]);
// };
