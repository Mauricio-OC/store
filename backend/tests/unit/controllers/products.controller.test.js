const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);
const { expect } = chai;

const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/products.controller');
const { productsList } = require('../mocks/products.mocks');

describe('products controller', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar todos os produtos', async function () {
    sinon.stub(productService, 'getAllProducts').resolves(productsList);
    await productController.getAllProducts(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(productsList);
  });

  it('deve retornar um produto pelo ID', async function () {
    req.params = { id: 1 };
    sinon.stub(productService, 'getProductById').resolves(productsList[0]);
    await productController.getProductById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(productsList[0]);
  });

  it('deve tratar o caso de produto não encontrado', async function () {
    req.params = { id: 1 };
    sinon.stub(productService, 'getProductById').resolves(false);
    await productController.getProductById(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });
});
