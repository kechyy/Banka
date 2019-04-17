/* eslint-disable import/named */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const signUpEndPoint = '/api/v1/auth/signup';
const accountUpdateEndPoint = '/api/v1/account/0004456511';
const accountErrorUpdateEndPoint = '/api/v1/account/0004456222';
let generateToken;

describe('Create token for signup user', () => {
  it('should return token for successful login', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send({ id: 1,
        firstName: 'Rosemary',
        lastName: 'Emmanuel',
        email: 'rossy3@gmail.com',
        password: 'rosemary123&%',
        cpassword: 'rosemary123&%'
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        generateToken = response.body.data.token;
        done();
      });
  });
});

describe('Test for deactivate and activate account controller', () => {
  it('should return status code 200 for account successfully updated', (done) => {
    chai.request(app)
      .patch(accountUpdateEndPoint)
      .send({ accountNumber: '0004456511' })
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
  it('should return status code 404 for account number not found', (done) => {
    chai.request(app)
      .patch(accountErrorUpdateEndPoint)
      .send({ accountNumber: '0004456222' })
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('Invalid account number');
        done();
      });
  });
});
