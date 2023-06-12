const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { salesList } = require('../mocks/sales.mocks');

describe('sales controller', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('retorna status 200 e um array com todas as vendas', async function () {
    sinon.stub(salesService, 'getAllSales').resolves(salesList);
    await salesController.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(salesList);
  });

  it('deve retornar a venda com o ID correto ao chamar getSalesById', async function () {
    req.params = { id: 1 };
    sinon.stub(salesService, 'getSalesById').resolves(salesList[0]);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(salesList[0]);
  });

  it('retorna uma mensagem de erro ao chamar getSalesById com um ID inválido', async function () {
    req.params = { id: 999 };
    sinon.stub(salesService, 'getSalesById').resolves(false);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWithExactly({ message: 'Sale not found' });
  });
});
