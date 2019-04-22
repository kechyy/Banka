/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { userExist, userCreated } from './mockObjects/userControllerObjectData';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const signUpEndPoint = '/api/v1/auth/signup';

describe.only('Test for user signup controller', () => {
  it('should return status code 409 for user signup data exist', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(userExist);
    expect(response).to.have.status(409);
    expect(response.body).to.be.an('object');
    expect(response.body.error).to.equal('User already exist');
  });
  it('should return status code 201 for user successful signup', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send({
        firstName: 'Rosemary',
        lastName: 'Emmanuel',
        email: 'rossy@gm666ail.com',
        password: 'rosemary123&%',
        cpassword: 'rosemary123&%'
      });
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
  });
});
