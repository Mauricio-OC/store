const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');
const { productsList, updatedProduct } = require('../mocks/products.mocks');

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
  it('deve adicionar um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: updatedProduct.id }]);
    
    const result = await productModel.createProduct(updatedProduct.name);
    
    expect(connection.execute)
    .to.be.calledOnceWith('INSERT INTO products (name) VALUES (?)', [updatedProduct.name]);
    expect(result).to.deep.equal({ id: updatedProduct.id, name: updatedProduct.name });
});
});