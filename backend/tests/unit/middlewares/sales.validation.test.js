const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  validateProductIds,
  validateQuantities,
  validateQuantityGreaterThanZero,

} = require('../../../src/middlewares/validateSales');

chai.use(sinonChai);

const { expect } = chai;

describe('Teste dos Middlewares - Sales', function () {
  let req;
  let res;

  beforeEach(function () {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    sinon.restore();
  });

//   it.skip('Testando se o campo productId existe no middleware', function () {
//     const next = sinon.stub().returns();
//     req.body = [{ productId: 1, quantity: 1 }];
//     validateProductIds(req, res, next);
//     expect(next).to.have.been.calledWithExactly();
//   });

  it('Testando se o campo quantity existe no middleware', function () {
    const next = sinon.stub();
    req.body = [{ productId: 1, quantity: 1 }];
    validateQuantities(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando o next, caso o campo quantity esteja correto', function () {
    const next = sinon.stub();
    req.body = [{ productId: 1, quantity: 1 }];
    validateQuantityGreaterThanZero(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se o campo quantity retorna um erro no middleware', function () {
    const next = sinon.stub();
    req.body = [{ productId: 1 }];
    validateQuantities(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"quantity" is required' });
  });

  it('Testando se o campo productId retorna um erro no middleware', function () {
    const next = sinon.stub();
    req.body = [{ quantity: 1 }];
    validateProductIds(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"productId" is required' });
  });

  it('Testando se o campo quantity é menor ou igual a zero', function () {
    const next = sinon.stub();
    req.body = [{ productId: 1, quantity: 0 }];
    validateQuantityGreaterThanZero(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json)
    .to.be.calledWithExactly({ message: '"quantity" must be greater than or equal to 1' });
  });
});
