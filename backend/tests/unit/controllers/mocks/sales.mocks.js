const listSales = [
  {
    saleId: 1,
    date: '2023-05-30T23:58:40.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-30T23:58:40.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-30T23:58:40.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesById = [
  {
    date: '2023-05-30T23:58:40.000Z',
    productId: 3,
    quantity: 15,
  },
];

const newSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const newOneSale = [{
  productId: 1,
  quantity: 1,
}];

const saleErrorId = [{
  productId: '',
  quantity: 1,
}];

const saleErrorQuantity = [{
  productId: 1,
  quantity: 0,
}];

const saleErrorId2 = [{
  productId: 99,
  quantity: 1,
}];

const saleErrorQuantity2 = [{
  productId: 1,
}];

module.exports = {
  listSales,
  salesById,
  newSale,
  newOneSale,
  saleErrorId,
  saleErrorQuantity,
  saleErrorId2,
  saleErrorQuantity2,
};