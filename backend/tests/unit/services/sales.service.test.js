const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const salesModel = require('../../../src/models/sales.model');
const salesServices = require('../../../src/services/sales.service');
const salesMiddlewares = require('../../../src/middlewares/validateSales');
const { listSales, salesById,
  saleErrorId, saleErrorQuantity, saleErrorId2,
  saleErrorQuantity2 } = require('./mocks/sales.mocks');

describe('Testes da camada service do Sales', function () {
  it('deve retornar um array com todas as vendas ao chamar getAllSale', async function () {
    sinon.stub(salesModel, 'getAllSale').resolves([listSales]);
    const result = await salesServices.getAllSale();
    expect(result).to.be.deep.equal([listSales]);
  });

  it('retorna uma venda específica ao chamar getByIdSale com um ID válido', async function () {
    sinon.stub(salesModel, 'getByIdSale').resolves([[salesById]]);
    const [[result]] = await salesServices.getByIdSale(1);
    expect(result).to.be.deep.equal(salesById);
  });

  it('deve retornar um erro ao chamar a função getByIdSale com um ID inválido', async function () {
    sinon.stub(salesModel, 'getByIdSale').resolves([]);
    const result = await salesServices.getByIdSale(3424);
    expect(result).to.be.deep.equal('error');
  });

  it('deve retornar um erro ao adicionar uma nova venda sem um produto', async function () {
    const result = await salesServices.saleAdd(saleErrorId);
    const validateSale = await salesMiddlewares.middleSaleQtd(saleErrorId);
    expect(validateSale.message).to.be.deep.equal('"productId" is required');
    expect(result).to.be.deep.equal({ type: 400, message: '"productId" is required' });
  });

  it('deve retornar um erro ao adicionar uma nova venda com quantidade 0', async function () {
    const result = await salesServices.saleAdd(saleErrorQuantity);
    const validateSale = await salesMiddlewares.middleSaleQtd(saleErrorQuantity);
    expect(validateSale.message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
    expect(result).to.be.deep
    .equal({ type: 422, message: '"quantity" must be greater than or equal to 1' });
  });

  it('retornar um erro ao adicionar uma nova venda com um produto inexistente', async function () {
    sinon.stub(salesMiddlewares, 'middleSaleQtd')
    .resolves({ type: 404, message: 'Product not found' });
    const result = await salesServices.saleAdd(saleErrorId2);
    expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
  });

  it('deve retornar um erro ao adicionar uma nova venda sem quantidade', async function () {
    const result = await salesServices.saleAdd(saleErrorQuantity2);
    const validateSale = await salesMiddlewares.middleSaleQtd(saleErrorQuantity2);
    expect(validateSale.message).to.be.deep.equal('"quantity" is required');
    expect(result).to.be.deep.equal({ type: 400, message: '"quantity" is required' });
  });

  it('deve deletar uma venda existente ao chamar a função deleteSale', async function () {
    sinon.stub(salesModel, 'getByIdSale').resolves([
      {
        date: '2023-05-30T23:58:40.000Z',
        productId: 3,
        quantity: 15,
      },
    ]);
    sinon.stub(salesModel, 'deleteSale').resolves({ type: 204 });
    const result = await salesServices.deleteSale(1);
    expect(result).to.be.deep.equal({ type: 204 });
  });

  it('retornar um erro ao chamar a função deleteSale com um ID inexistente', async function () {
    sinon.stub(salesModel, 'getByIdSale').resolves([]);
    const result = await salesServices.deleteSale(1);
    expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
  });

  it('deve alterar a quantidade de um produto da venda com sucesso', async function () {
    sinon.stub(salesModel, 'getByIdSale').resolves([
      {
        date: '2023-05-30T23:58:40.000Z',
        productId: 1,
        quantity: 15,
      },
    ]);
    sinon.stub(salesModel, 'updateSales').resolves({
      type: 200,
      message: {
        date: '2023-06-14T19:21:21.000Z',
        productId: 1,
        quantity: 10,
        saleId: 1,
      },
    });
    const result = await salesServices.updateSales(1, 1, 10);
    expect(result).to.be.deep.equal({
      type: 200,
      message: {
        date: '2023-06-14T19:21:21.000Z',
        productId: 1,
        quantity: 10,
        saleId: 1,
      },
    });
  });

  it('retornar um erro ao chamar  updateSales com uma quantidade menor que 1', async function () {
    const result = await salesServices.updateSales(1, 1, -99);
    expect(result).to.be.deep
    .equal({ type: 422, message: '"quantity" must be greater than or equal to 1' });
  });

  it('deve retornar um erro ao chamar a função updateSales sem uma quantidade', async function () {
    const result = await salesServices.updateSales(2, 2);
    expect(result).to.be.deep.equal({ type: 400, message: '"quantity" is required' });
  });

  it('retornar um erro ao chamar  updateSales com um ID de venda inexistente', async function () {
    sinon.stub(salesModel, 'getByIdSale').resolves([]);
    const result = await salesServices.updateSales(9999, 1, 10);
    expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
  });

  it('retornar um erro ao chamar updateSales com um ID de produto inexistente', async function () {
    sinon.stub(salesModel, 'getByIdSale').resolves([
      {
        date: '2023-05-30T23:58:40.000Z',
        productId: 1,
        quantity: 15,
      },
    ]);
    const result = await salesServices.updateSales(1, 213123, 10);
    expect(result).to.be.deep.equal({ type: 404, message: 'Product not found in sale' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
