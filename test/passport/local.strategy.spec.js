const localStrategy = require('../../config/local.strategy.js')();
const User = require('../../app/models/user');

const sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-passport-strategy'));

const request = require('request');

const expect = require('chai').expect;
const should = chai.should();

describe('Local Strategy test', () => {
    let user;
    
    // this.sandbox = sinon.sandbox.create();

    // const requestStub = this.sandbox.stub(request, 'flash');
    let findOneStub;
    let saveStub;

    before(done => {
        // findOneStub = this.sandbox.stub(User, 'findOne').callsFake((data, cb) => done());
        // findOneStub = this.sandbox.stub(User, 'findOne').callsFake((data, cb) => done());
        // saveStub =  this.sandbox.stub(User, 'save').callsFake(() => done());

        findOneStub = sinon.stub(User, 'findOne').callsFake((data, cb) => done(null, null, done));
        saveStub =  sinon.stub(User, 'save').callsFake(() => done(null, {email: 'test@test.ru'}));

        console.log(localStrategy);
        chai.passport
            .use(localStrategy)
            .success((u, i) => { user = u; done(); })
            .req(req => {
                req.body = {
                    email: "test@test.com",
                    password: "test"
                }
            })
            .authenticate();
    });

    it('should call request stub', () => {
        console.log(user);
        // expect(findOneStub).to.be.called();
        findOneStub.restore();
        saveStub.restore();
        sinon.assert.calledWith(findOneStub, { 'local.email': 'test@test.com' });
        // sinon.assert.called(saveStub);
        // saveStub.should.have.been.called();
    });
    // findOneStub.restore();
    // this.sandbox.restore();
})