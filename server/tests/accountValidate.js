/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { undefinedFirstName, firstNameEmpty, firstNameNotSring,
  lastNameEmpty, undefinedlastName, lastNameNotString, emailAddressEmpty,
  emailAddressUndefined, emailAddressNotString, firstNameInvalidLength,
  lastNameInvalidLength, emailInvalidLength, emailInvalidFormat, typeNameEmpty,
  acctTypeUndefined, InvalidAccType, InvalidAccountNumber
} from './mockObjects/accountObjectData';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const accountEndPoint = '/api/v1/account';
const accountUpdateEndPoint = '/api/v1/account/098789';
const accountDeleteEndPoint = '/api/v1/account/098789';

describe('Test for account validation', () => {
  it('should return status code 400 for first name empty', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(firstNameEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('First name is required');
        done();
      });
  });
  it('should return status code 400 for undefined first name', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(undefinedFirstName)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal('First name is required');
        done();
      });
  });
  it('should return status code 400 for first name not a string', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(firstNameNotSring)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal('First name should be a string');
        done();
      });
  });
  it('should return status code 400 for last name empty', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(lastNameEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Last name is required');
        done();
      });
  });
  it('should return status code 400 for last name undefined', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(undefinedlastName)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Last name is required');
        done();
      });
  });
  it('should return status code 400 for last name not a string', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(lastNameNotString)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Last name should be a string');
        done();
      });
  });
  it('should return status code 400 for email address empty', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(emailAddressEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Email address is required');
        done();
      });
  });
  it('should return status code 400 for account type empty', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(typeNameEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('User type is required');
        done();
      });
  });
  it('should return status code 400 for account type undefined', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(acctTypeUndefined)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('User type is required');
        done();
      });
  });
  it('should return status code 400 for email address undefined', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(emailAddressUndefined)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Email address is required');
        done();
      });
  });
  
  it('should return status code 400 for email address not a string', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(emailAddressNotString)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Email address should be a string');
        done();
      });
  });
  it('should return status code 400 for firstname not an alphabet and less than 2 or greater than 25', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(firstNameInvalidLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('First name must be an alphabet with length 2 to 25');
        done();
      });
  });
  it('should return status code 400 for lastname not an alphabet and less than 2 or greater than 25', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(lastNameInvalidLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Last name must be an alphabet with length 2 to 25');
        done();
      });
  });
  it('should return status code 400 for email less than 8 or greater than 50', (done) => {
    chai.request(app)
      .post(accountEndPoint)
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
      .post(accountEndPoint)
      .send(emailInvalidFormat)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Invalid email address format');
        done();
      });
  });
  it('should return status code 400 for account type not current or savings', (done) => {
    chai.request(app)
      .post(accountEndPoint)
      .send(InvalidAccType)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Account type must be either savings or current account');
        done();
      });
  });
  it('should return status code 400 for invalid account number', (done) => {
    chai.request(app)
      .patch(accountUpdateEndPoint)
      .send(InvalidAccountNumber)
      .end((error, response) => {
        console.log(response.status);
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Account number must be 10 digit number');
        done();
      });
  });
  it('should return status code 400 for invalid account number', (done) => {
    chai.request(app)
      .delete(accountDeleteEndPoint)
      .send(InvalidAccountNumber)
      .end((error, response) => {
        console.log(response.status);
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Account number must be 10 digit number');
        done();
      });
  });
});
