const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { salesList, saleIdMock } = require('../mocks/sales.mocks');

describe('Teste da camada model do SalesModel', function () {
  describe('Testa a rota /sales', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa se a função getAllSales retorna uma lista com todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([salesList]);

      const result = await salesModel.getAllSales();
      expect(result).to.be.deep.equal(salesList);
    });

    it('Testa se a função getSalesById retorna as vendas de um ID correto', async function () {
      sinon.stub(connection, 'execute').resolves([saleIdMock]);

      const result = await salesModel.getSalesById(1);
      expect(result).to.be.deep.equal(saleIdMock);
    });
  });
});
