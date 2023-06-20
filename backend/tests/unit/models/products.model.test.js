const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/product.model');
const {
  listProducts,
  productById,
  newProduct,
  newProductData,
  productEdit,
} = require('./mocks/products.mocks');

describe('Testes da camada model do Products', function () {
  it('retornar um array com todos os produtos ao chamar a função getAllProduct', async function () {
    sinon.stub(connection, 'execute').resolves([listProducts]);
    const result = await productsModel.getAllProduct();
    expect(result).to.be.deep.equal(listProducts);
  });

  it('retornar um produto específico com base no ID na função getByIdProduct', async function () {
    sinon.stub(connection, 'execute').resolves([[productById]]);
    const result = await productsModel.getByIdProduct(2);
    expect(result).to.be.deep.equal(productById);
  });

  it('retornar um erro ao chamar a função getByIdProduct com um ID inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined]]);
    const result = await productsModel.getByIdProduct(5);
    expect(result).to.be.deep.equal('erro');
  });

  it('deve cadastrar um novo produto com sucesso ao chamar a função addProduct', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves()
      .onSecondCall()
.resolves([[newProductData]]);
    const result = await productsModel.addProduct(newProduct.name);
    expect(result).to.be.deep.equal({ type: 201, message: newProductData });
  });

  it('atualizar um produto com sucesso ao chamar a função updateProductById', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productsModel.updateProductById(2, productEdit.name);
    expect(result).to.be.deep.equal({ type: 200, message: { id: 2, name: productEdit.name } });
  });

  it('deve deletar um produto com sucesso ao chamar a função deleteProduct', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productsModel.deleteProduct(2);
    expect(result).to.be.deep.equal({ type: 204 });
  });

  afterEach(function () {
    sinon.restore();
  });
});
