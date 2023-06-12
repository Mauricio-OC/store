const connection = require('./connection');

const getAllSales = async () => {
  const SQL = `SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id`;

  const [result] = await connection.execute(SQL);
  return result;
};

const getSalesById = async (id) => {
  const SQL = `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?`;

  const [result] = await connection.execute(SQL, [id]);
  return result;
};

const newSalesProducts = async (product) => {
  const SQL_INSERT_SALES = 'INSERT INTO StoreManager.sales () VALUES ()';
  const SQL_INSERT_SALES_PRODUCTS = `INSERT INTO StoreManager.sales_products (
    sale_id, product_id, quantity) VALUES (?, ?, ?)`;

  const [result] = await connection.execute(SQL_INSERT_SALES);
  const { insertId } = result;

  const createNewSales = product.map(async ({ productId, quantity }) => {
    await connection.execute(SQL_INSERT_SALES_PRODUCTS, [insertId, productId, quantity]);
  });

  await Promise.all(createNewSales);

  return { id: insertId, itemsSold: product };
};

// const deleteSale = async (id) => {
//   const SQL = 'DELETE FROM StoreManager.sales WHERE id = ?';
//   await connection.execute(SQL, [id]);
//   return 'done';
// };

module.exports = {
  getAllSales,
  getSalesById,
  newSalesProducts,
};
