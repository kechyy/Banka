/* eslint-disable import/named */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { accountEmailExist, accountCreated } from './mockObjects/accountControllerObjectData';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const accountEndPoint = '/api/v1/account';
const signUpEndPoint = '/api/v1/auth/signup';
let generateToken;
describe('Create token for signup user', () => {
  it('should return token for successful login', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send({ id: 1,
        firstName: 'Rosemary',
        lastName: 'Emmanuel',
        email: 'rossy2@gmail.com',
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
describe('Test for create account controller', () => {
  it('should return status code 409 for account email already exist in dummy data', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(accountEmailExist)
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.error).to.equal('Account with this email already exist');
        done();
      });
  });
  it('should return status code 201 for account successfully created', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(accountCreated)
      .set('authorization', generateToken)
      .end((error, response) => {
        expect(response).to.have.status(201);
        done();
      });
  });
});
