const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');
const { productsList } = require('../mocks/products.mocks');

describe('models products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar todos os produtos', async function () {
    const executeStub = sinon.stub(connection, 'execute').resolves([productsList]);
    const result = await productModel.getAllProducts();
    expect(executeStub).to.be.calledOnceWith('SELECT * FROM StoreManager.products');
    expect(result).to.deep.equal(productsList);
  });

  it('deve retornar um produto pelo ID', async function () {
    const expectedProduct = productsList[0];
    const executeStub = sinon.stub(connection, 'execute').resolves([[expectedProduct]]);
    const result = await productModel.getProductById(1);
    expect(executeStub).to.be.calledOnceWith(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [1],
    );
    expect(result).to.deep.equal(expectedProduct);
  });
});
