const connection = require('./connection');

const getAllSalesQuery = 'SELECT sp.sale_id as saleId, ' 
+ 's.date as date, sp.product_id as productId,sp.quantity as quantity '
+ 'FROM sales_products AS sp join sales as s on sp.sale_id = s.id;';

const getSaleByIdQ = 'SELECT s.date as date, sp.product_id as productId, sp.quantity as quantity ' 
+ 'FROM sales_products AS sp join sales as s on sp.sale_id = s.id where sp.sale_id = ?;';

const addSaleQuery = 'INSERT INTO sales (date) VALUES (NOW());';

const addSaleProdQ = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';

const deleteSaleProductQuery = 'DELETE FROM sales_products WHERE sale_id = ?;';

const deleteSaleQuery = 'DELETE FROM sales WHERE id = ?;';

const updateQuePro = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;';

const updateSaleDateQuery = 'UPDATE sales SET date = NOW() WHERE id = ?;';

const getSaleDateQuery = 'SELECT date FROM sales WHERE id = ?;';

const getAllSale = async () => {
  const [result] = await connection.execute(getAllSalesQuery);
  return result;
};

const getByIdSale = async (id) => {
  const [result] = await connection.execute(getSaleByIdQ, [id]);
  return result;
};

const saleAdd = async (sale) => {
  const { sId, pId, q } = sale;
  await connection.execute(addSaleQuery);
  await connection.execute(addSaleProdQ, [sId, pId, q]);
  return { productId: pId, quantity: q };
};

const deleteSale = async (id) => {
  await connection.execute(deleteSaleProductQuery, [id]);
  await connection.execute(deleteSaleQuery, [id]);
  return { type: 204 };
};

const updateSales = async (SId, PId, qtd) => {
  await connection.execute(updateQuePro, [qtd, SId, PId]);
  await connection.execute(updateSaleDateQuery, [SId]);
  const [[date]] = await connection.execute(getSaleDateQuery, [SId]);
  return { type: 200,
    message: {
    date: date.date,
    productId: +PId,
    quantity: +qtd,
    saleId: +SId,
  } };
};

module.exports = {
  getAllSale,
  getByIdSale,
  saleAdd,
  deleteSale,
  updateSales,
};