const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const saleController = require('../../../src/controllers/sales.controller');
const salesServices = require('../../../src/services/sales.service');
const { listSales, salesById, newOneSale, newSale, saleErrorId } = require('./mocks/sales.mocks');

describe('Testes da camada controller do Sales', function () {
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um array com todas as vendas ao chamar  getAllSale', async function () {
    const req = {};
    sinon.stub(salesServices, 'getAllSale').resolves([listSales]);
    await saleController.getAllSale(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([listSales]);
  });

  it('retornar uma venda específica ao chamar getByIdSale com um ID existente', async function () {
    const req = { params: { id: 2 } };
    sinon.stub(salesServices, 'getByIdSale').resolves([[salesById]]);
    await saleController.getByIdSale(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([[salesById]]);
  });

  it('retornar um erro ao chamar a função getByIdSale com um ID inexistente', async function () {
    const req = { params: { id: 9999 } };
    sinon.stub(salesServices, 'getByIdSale').resolves('error');
    await saleController.getByIdSale(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
  });

  it('deve adicionar uma nova venda com sucesso ao chamar a função saleAdd', async function () {
    const req = { body: newOneSale };
    sinon.stub(salesServices, 'saleAdd').resolves({ type: 201, message: newSale });
    await saleController.saleAdd(req, res);
    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWithExactly(newSale);
  });

  it('retorna  erro ao tentar adicionar uma nova venda sem sucesso saleAdd', async function () {
    const req = { body: saleErrorId };
    sinon.stub(salesServices, 'saleAdd')
    .resolves({ type: 400, message: '"productId" is required' });
    await saleController.saleAdd(req, res);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"productId" is required' });
  });

  it('deve deletar uma venda com sucesso ao chamar a função deleteSale', async function () {
    const req = { params: { id: 1 } };
    sinon.stub(salesServices, 'deleteSale').resolves({ type: 204 });
    await saleController.deleteSale(req, res);
    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWithExactly();
  });

  it('retornar erro ao tentar deletar uma venda inexistente em deleteSale', async function () {
    const req = { params: { id: 9999 } };
    sinon.stub(salesServices, 'deleteSale').resolves({ type: 404, message: 'Sale not found' });
    await saleController.deleteSale(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
  });

  it('editar a quantidade de um produto da venda na função updateSales', async function () {
    const req = { body: { quantity: 15 }, params: { saleId: 1, productId: 1 } };
    sinon.stub(salesServices, 'updateSales').resolves({
      type: 200,
      message: {
        date: '2023-05-06T03:14:28.000Z',
        productId: 1,
        quantity: 15,
        saleId: 1,
      },
    });
    await saleController.updateSales(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly({
      date: '2023-05-06T03:14:28.000Z',
      productId: 1,
      quantity: 15,
      saleId: 1,
    });
  });

  it('retorna um erro ao editar quantidade do produto da venda na updateSales', async function () {
    const req = { body: { quantity: -5 }, params: { saleId: 1, productId: 1 } };
    sinon.stub(salesServices, 'updateSales').resolves({
      type: 422,
      message: '"quantity" must be greater than or equal to 1',
    });
    await saleController.updateSales(req, res);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({
      message: '"quantity" must be greater than or equal to 1',
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
