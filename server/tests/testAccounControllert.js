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
describe.only('Create token for signup user', () => {
  it('should return token for successful signup', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send({
        firstName: 'Rosemary',
        lastName: 'Emmanuel',
        email: 'rossy333@gmail.com',
        password: 'rosemary123&%',
        cpassword: 'rosemary123&%'
      });
    expect(response).to.have.status(201);
    generateToken = response.body.data.token;
  });
  it('should return status code 201 for account successfully created', async () => {
    const response = await chai.request(app)
      .post(accountEndPoint)
      .send({type: 'savings'})
      .set('authorization', generateToken);
    expect(response).to.have.status(201);
  });
});
