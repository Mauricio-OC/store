const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productsModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const productsMiddlewares = require('../../../src/middlewares/validateName');
const { listProducts, productById, productEdit, 
  newProductData, newProduct, newOneProduct } = require('./mocks/products.mocks');

describe('Testes da camada service do Products', function () {
  it('retornar um array com todos os produtos ao chamar a função getAllProduct', async function () {
    sinon.stub(productsModel, 'getAllProduct').resolves([listProducts]);
    const result = await productService.getAllProduct();
    expect(result).to.be.deep.equal([listProducts]);
  });

  it('retorna um produto específico com base no ID na função getByIdProduct', async function () {
    sinon.stub(productsModel, 'getByIdProduct').resolves([[productById]]);
    const [[result]] = await productService.getByIdProduct(2);
    expect(result).to.be.deep.equal(productById);
  });

  it('retornar um erro ao chamar a função getByIdProduct com um ID inexistente', async function () {
    sinon.stub(productsModel, 'getByIdProduct').resolves('erro');
    const result = await productService.getByIdProduct(1342342); 
    expect(result).to.be.deep.equal('error');
  });

  it('deve cadastrar um novo produto com sucesso ao chamar a função addProduct', async function () {
    const result = await productService.addProduct(newProduct.name);
    expect(result).to.be.deep.equal({ type: 201, message: newProductData });
  });

  it('deve retornar um erro ao cadastrar um novo produto sem nome', async function () {
    const result = await productService.addProduct('');
    expect(result).to.be.deep.equal({ type: 400, message: '"name" is required' });
  });

  it('deve retornar um erro ao cadastrar um novo produto com nome errado', async function () {
    const result = await productService.addProduct(newOneProduct.name);
    expect(result).to.be.deep
    .equal({ type: 422, message: '"name" length must be at least 5 characters long' });
  });

  it('deve atualizar um produto com sucesso  na função updateProductById', async function () {
    const result = await productService.updateProductById(2, productEdit.name);
    expect(result).to.be.deep.equal({ type: 200, message: { id: 2, name: productEdit.name } });
  });

  it('deve retornar um erro ao tentar atualizar um produto inexistente', async function () {
    const result = await productService.updateProductById(5657, productEdit.name);
    sinon.stub(productsMiddlewares, 'middleName').resolves({ type: 200, message: 'ok' });
    sinon.stub(productsModel, 'getByIdProduct').resolves('erro');
    expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
  });

  it('deve deletar um produto existente na função deleteProduct com ID válido', async function () {
    sinon.stub(productsModel, 'getByIdProduct').resolves([
      {
        date: '2023-05-06T03:14:28.000Z',
        productId: 3,
        quantity: 999,
      },
    ]);
    sinon.stub(productsModel, 'deleteProduct').resolves({ type: 204 });
    const result = await productService.deleteProduct(1);
    expect(result).to.be.deep.equal({ type: 204 });
  });

  it('deve retornar um erro ao tentar deletar um produto inexistente', async function () {
    sinon.stub(productsModel, 'getByIdProduct').resolves('erro');
    const result = await productService.deleteProduct(1123123);
    expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
