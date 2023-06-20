const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const PRODUCT_NOT_FOUND_MESSAGE = 'Product not found';
const { expect } = chai;
const productController = require('../../../src/controllers/products.controller');
const productService = require('../../../src/services/product.service');
const { 
  listProducts, 
  productById, 
  newProductData, 
  newProduct, 
  newOneProduct, 
} = require('./mocks/products.mocks');

describe('Testes da camada controller do Products', function () {
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('retorna um array com os produtos ao chamar a função getAllProduct', async function () {
    const req = {};
    sinon.stub(productService, 'getAllProduct').resolves([listProducts]);
    await productController.getAllProduct(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([listProducts]);
  });

  it('retorna o id correspondente em getByIdProduct com um id existente', async function () {
    const req = { params: { id: 2 } };
    sinon.stub(productService, 'getByIdProduct').resolves([[productById]]);
    await productController.getByIdProduct(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([[productById]]);
  });

  it('retorna um erro não encontrado em getByIdProduct com um id inexistente', async function () {
    const req = { params: { id: 99999 } };
    sinon.stub(productService, 'getByIdProduct').resolves('error');
    await productController.getByIdProduct(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: PRODUCT_NOT_FOUND_MESSAGE });
  });

  it('adiciona  e retorna o produto ao chamar a função addProduct', async function () {
    const req = { body: { name: newProduct.name } };
    sinon.stub(productService, 'addProduct').resolves({ type: 201, message: newProductData });
    await productController.addProduct(req, res);
    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWithExactly(newProductData);
  });

  it('retorna um erro de nome não fornecido em addProduct com um nome vazio', async function () {
    const req = { body: { name: '' } };
    sinon.stub(productService, 'addProduct').resolves({ type: 400, message: '"name" is required' });
    await productController.addProduct(req, res);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"name" is required' });
  });

  it('retorna um erro de tamanho mínimo  do produto addProduct  incorreto', async function () {
    const req = { body: { name: newOneProduct.name } };
    sinon.stub(productService, 'addProduct')
    .resolves({ type: 422, message: '"name" length must be at least 5 characters long' });
    await productController.addProduct(req, res);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be
    .calledWithExactly({ message: '"name" length must be at least 5 characters long' });
  });

  it('atualiza com sucesso e retorna o produto atualizado updateProductById', async function () {
    const req = { body: { name: newProduct.name }, params: { id: 1 } };
    sinon.stub(productService, 'updateProductById')
    .resolves({ type: 200, message: { id: 1, name: newProduct.name } });
    await productController.updateProductById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly({ id: 1, name: newProduct.name });
  });

  it(' retorna um erro de produto updateProductById id inexistente', async function () {
    const req = { body: { name: newProduct.name }, params: { id: 999999 } };
    sinon.stub(productService, 'updateProductById')
    .resolves({ type: 404, message: PRODUCT_NOT_FOUND_MESSAGE });
    await productController.updateProductById(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: PRODUCT_NOT_FOUND_MESSAGE });
  });

  it('retorna erro de tamanho mínimo do produto updateProductById incorreto', async function () {
    const req = { body: { name: 'a' }, params: { id: 1 } };
    sinon.stub(productService, 'updateProductById')
    .resolves({ type: 422, message: '"name" length must be at least 5 characters long' });
    await productController.updateProductById(req, res);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be
    .calledWithExactly({ message: '"name" length must be at least 5 characters long' });
  });

  it(' deletar o produto com sucesso ao chamar a função deleteProduct', async function () {
    const req = { params: { id: 1 } };
    sinon.stub(productService, 'deleteProduct').resolves({ type: 204 });
    await productController.deleteProduct(req, res);
    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWithExactly();
  });

  it('retorna um erro de  não encontrado deleteProduct com um id inexistente', async function () {
    const req = { params: { id: 9999999 } };
    sinon.stub(productService, 'deleteProduct')
    .resolves({ type: 404, message: PRODUCT_NOT_FOUND_MESSAGE });
    await productController.deleteProduct(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: PRODUCT_NOT_FOUND_MESSAGE });
  });

  afterEach(function () {
    sinon.restore();
  });
});
