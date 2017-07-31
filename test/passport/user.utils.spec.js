const chai = require('chai');
const chaiHttp = require('chai-http');
const spies = require('chai-spies');

chai.use(spies);

const should = chai.should();

const userUtils = require('../../config/passport.user.utils');

describe('Passport User Utils tests', () => {
    it('should return new user if not found', () => {
        const done = chai.spy();

        // userUtils.onUserFindOne(null, {_id: 222}, done);

        done.should.have.been.called()
    });
})
