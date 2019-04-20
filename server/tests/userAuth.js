/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { undefinedFirstName, firstNameEmpty, firstNameNotSring,
  lastNameEmpty, undefinedlastName, lastNameNotString, emailAddressEmpty,
  emailAddressUndefined, emailAddressNotString, firstNameInvalidLength, lastNameInvalidLength, emailInvalidLength, emailInvalidFormat,
  passwordEmpty, passwordNotString, passwordNotStrong, passwordNotSame, passwordUndefined, cpasswordUndefined
} from './mockObjects/userObjectData';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const signUpEndPoint = '/api/v1/auth/signup';

describe.only('Test for signup user', () => {
  it('should return status code 400 for first name empty', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(firstNameEmpty);
      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.equal('First name field is required');
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
  it('should return status code 400 for firstname not an alphabet and less than 2 or greater than 25', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
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
      .post(signUpEndPoint)
      .send(lastNameInvalidLength)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Last name must be an alphabet with length 2 to 25');
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
      .send(passwordEmpty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('password field is required');
        done();
      });
  });
  it('should return status code 400 for password undefined', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(passwordUndefined)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('password field is required');
        done();
      });
  });
  it('should return status code 400 for password not a string', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(passwordNotString)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('password should be a string');
        done();
      });
  });
  it('should return status code 400 for password not strong', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(passwordNotStrong)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Password must be minimum of 8 and maximum of 16 characters and must be with combination of special characters');
        done();
      });
  });
  it('should return status code 400 for password not the same', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(passwordNotSame)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Password must be the same');
        done();
      });
  });
  it('should return status code 400 for undefined confirm password', (done) => {
    chai.request(app)
      .post(signUpEndPoint)
      .send(cpasswordUndefined)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body.error).to.equal('Confirm password field is required');
        done();
      });
  });
});
