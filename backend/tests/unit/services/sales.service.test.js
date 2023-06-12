const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { salesList, saleIdMock } = require('../mocks/sales.mocks');

describe('sales service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('retorna todas as vendas ao chamar a função getAllSales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesList);
    const result = await salesService.getAllSales();
    expect(result).to.deep.equal(salesList);
  });

  it('retorna uma venda com o ID correto ao chamar a função getSalesById', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(saleIdMock);
    const result = await salesService.getSalesById(1);
    expect(result).to.deep.equal(saleIdMock);
  });

  it('retorna falso ao chamar a função getSalesById com um ID inválido', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(false);
    const result = await salesService.getSalesById(30);
    expect(result).to.be.deep.equal(false);
  });
});
