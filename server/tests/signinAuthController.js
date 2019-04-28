/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { userConfirmed, confirmEmail, confirmPassword } from './mockObjects/signinControllerObjectData';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const signInEndPoint = '/api/v1/user/auth/signin';

describe('Test for user signin controller', () => {
  it('should return status code 400 for user email does not exist', async () => {
    const response = await chai.request(app)
      .post(signInEndPoint)
      .send(confirmEmail);
    expect(response).to.have.status(404);
    expect(response.body.error).to.equal('User does  not exist. You need to signup');
  });
  it('should return status code 404 for user signin not in database', async () => {
    const response = await chai.request(app)
      .post(signInEndPoint)
      .send(confirmPassword);
    expect(response).to.have.status(404);
    expect(response.body.error).to.equal('User does  not exist. You need to signup');
  });
  it('should return status code 200 for user signin successful', async () => {
    const response = await chai.request(app)
      .post(signInEndPoint)
      .send(userConfirmed);
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('object');
  });
});
