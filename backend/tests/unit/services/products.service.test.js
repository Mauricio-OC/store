const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const { productsList } = require('../mocks/products.mocks');

describe('product Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar todos os produtos', async function () {
    const getAllStub = sinon.stub(productModel, 'getAllProducts').resolves(productsList);
    const result = await productService.getAllProducts();
    expect(getAllStub.calledOnce).to.be.deep.equal(true);
    expect(result).to.deep.equal(productsList);
  });

  it('deve retornar um produto pelo ID existente', async function () {
    const expectedProduct = productsList[0];
    const getByIdStub = sinon.stub(productModel, 'getProductById').resolves(expectedProduct);
    const result = await productService.getProductById(1);
    expect(getByIdStub).to.be.calledOnceWith(1);
    expect(result).to.deep.equal(expectedProduct);
  });

  it('deve retornar falso quando o produto pelo ID não existe', async function () {
    const getByIdStub = sinon.stub(productModel, 'getProductById').resolves(false);
    const result = await productService.getProductById(1);
    expect(getByIdStub).to.be.calledOnceWith(1);
    expect(result).to.be.deep.equal(false);
  });
});
