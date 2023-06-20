const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { listSales, salesById, newSale, newOneSale } = require('./mocks/sales.mocks');

describe('Testes da camada model do Sales', function () {
  it('deve retornar um array com todas as vendas ao chamar  getAllSale', async function () {
    sinon.stub(connection, 'execute').resolves([listSales]);
    const result = await salesModel.getAllSale();
    expect(result).to.be.deep.equal(listSales);
  });

  it('retorna uma venda específica ao chamar  getByIdSale com um ID válido', async function () {
    sinon.stub(connection, 'execute').resolves([salesById]);
    const result = await salesModel.getByIdSale(2);
    expect(result).to.be.deep.equal(salesById);
  });

  it('deve adicionar uma nova venda com sucesso ao chamar a função saleAdd', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves()
      .onSecondCall()
      .resolves();
    const result = await salesModel.saleAdd(newSale);
    expect(result).to.be.deep.equal(newOneSale);
  });

  it('deve deletar uma venda com sucesso ao chamar a função deleteSale', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(1);
    expect(result).to.be.deep.equal({ type: 204 });
  });

  it('alterar a quantidade de um produto da venda com sucesso em updateSales', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves()
      .onSecondCall()
      .resolves()
      .onThirdCall()
      .resolves([[{
        date: '2023-06-14T19:21:21.000Z',
        productId: 2,
        quantity: 15,
        saleId: 2,
      }]]);
    const result = await salesModel.updateSales(2, 2, 15);
    expect(result).to.be.deep.equal({
      type: 200,
      message: {
        date: '2023-06-14T19:21:21.000Z',
        productId: 2,
        quantity: 15,
        saleId: 2,
      },
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
