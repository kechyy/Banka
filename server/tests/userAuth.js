/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { undefinedFirstName, firstNameEmpty, firstNameNotSring,
  lastNameEmpty, undefinedlastName, lastNameNotString, emailAddressEmpty,
  emailAddressUndefined, emailAddressNotString, emailInvalidLength, emailInvalidFormat,
  passwordNotEmpty
} from './mockObjects/userObjectData';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const signUpEndPoint = '/api/v1/auth/signup';

describe('Test for signup user', () => {
  it('should return status code 400 for first name empty', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(firstNameEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('First name field is required');
        done();
      });
  });
  it('should return status code 400 for undefined first name', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(undefinedFirstName)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal('First name field is required');
        done();
      });
  });
  it('should return status code 400 for first name not a string', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(firstNameNotSring)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal('FirstName should be a string');
        done();
      });
  });
  it('should return status code 400 for last name empty', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(lastNameEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Last name field is required');
        done();
      });
  });
  it('should return status code 400 for last name undefined', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(undefinedlastName)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Last name field is required');
        done();
      });
  });
  it('should return status code 400 for last name not a string', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(lastNameNotString)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('LastName should be a string');
        done();
      });
  });
  it('should return status code 400 for email address empty', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(emailAddressEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Email address field is required');
        done();
      });
  });
  it('should return status code 400 for email address undefined', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(emailAddressUndefined)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Email address field is required');
        done();
      });
  });
  it('should return status code 400 for email address not a string', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(emailAddressNotString)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Email address should be a string');
        done();
      });
  });
  it('should return status code 400 for email less than 8 or greater than', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(emailInvalidLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Email address should be atleast 8 to 50 character');
        done();
      });
  });
  it('should return status code 400 for invalid email address format', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(emailInvalidFormat)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Invalid email address format');
        done();
      });
  });
  it('should return status code 400 for password empty', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(passwordNotEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('password field is required');
        done();
      });
  });
});
