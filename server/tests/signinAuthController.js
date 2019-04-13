/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { confirmUser, userConfirmed } from './mockObjects/signinControllerObjectData';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const signInEndPoint = '/api/v1/auth/signin';

describe('Test for user signin controller', () => {
  it('should return status code 404 for user signin not in dummy data', (done) => {
    chai.request(app)
      .post(signInEndPoint)
      .send(confirmUser)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Please enter a valid username and password');
        done();
      });
  });
  it('should return status code 200 for user signin successful', (done) => {
    chai.request(app)
      .post(signInEndPoint)
      .send(userConfirmed)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Create token for logged in user', (done) => {
    chai.request(app)
      .post(signInEndPoint)
      .send(userConfirmed)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
