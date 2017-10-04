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
    
    let findOneStub;
    let saveStub;

    before(done => {
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
        findOneStub.restore();
        saveStub.restore();
        sinon.assert.calledWith(findOneStub, { 'local.email': 'test@test.com' });
    });
})