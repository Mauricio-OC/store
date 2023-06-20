const connection = require('./connection');

const GET_ALL_PRODUCTS_QUERY = 'SELECT * FROM products ORDER BY id';

const GET_PRODUCT_BY_ID_QUERY = 'SELECT * FROM products WHERE id = ?';

const INSERT_PRODUCT_QUERY = 'INSERT INTO products (name) VALUES (?)';

const SELECT_PRODUCT_BY_NAME_QUERY = 'SELECT * FROM products WHERE name = ?';

const UPDATE_PRODUCT_BY_ID_QUERY = 'UPDATE products SET name = ? WHERE id = ?';

const DELETE_PRODUCT_BY_ID_QUERY = 'DELETE FROM products WHERE id = ?';

const getAllProduct = async () => {
  const [result] = await connection.execute(GET_ALL_PRODUCTS_QUERY);
  return result;
};

const getByIdProduct = async (id) => {
  const [[result]] = await connection.execute(GET_PRODUCT_BY_ID_QUERY, [id]);
  if (result !== undefined) return result;
  return 'erro';
};

const addProduct = async (name) => {
  await connection.execute(INSERT_PRODUCT_QUERY, [name]);
  const [[result]] = await connection.execute(SELECT_PRODUCT_BY_NAME_QUERY, [name]);
  return { type: 201, message: result };
};

const updateProductById = async (id, name) => {
  await connection.execute(UPDATE_PRODUCT_BY_ID_QUERY, [name, id]);
  return { type: 200, message: { id: +id, name } };
};

const deleteProduct = async (id) => {
  await connection.execute(DELETE_PRODUCT_BY_ID_QUERY, [id]);
  return { type: 204 };
};

const searchProductByName = async (searchName) => {
  const result = await getAllProduct();
  const resultSearch = result.filter((product) => product.name.includes(searchName));
  return { type: 200, message: resultSearch };
};

module.exports = {
  getAllProduct,
  getByIdProduct,
  addProduct,
  updateProductById,
  deleteProduct,
  searchProductByName,
};