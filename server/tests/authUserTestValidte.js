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
  it('should return status code 400 for undefined first name', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(undefinedFirstName);
    expect(response).to.have.status(400);
    expect(response.body.error).to.equal('First name field is required');
  });
  it('should return status code 400 for first name not a string', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(firstNameNotSring);
    expect(response).to.have.status(400);
    expect(response.body.error).to.equal('FirstName should be a string');
  });
  it('should return status code 400 for last name empty', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(lastNameEmpty);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Last name field is required');
  });
  it('should return status code 400 for last name undefined', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(undefinedlastName);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Last name field is required');
  });
  it('should return status code 400 for last name not a string', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(lastNameNotString);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('LastName should be a string');
  });
  it('should return status code 400 for email address empty', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(emailAddressEmpty);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Email address field is required');
  });
  it('should return status code 400 for email address undefined', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(emailAddressUndefined);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Email address field is required');
  });
  it('should return status code 400 for email address not a string', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(emailAddressNotString);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Email address should be a string');
  });
  it('should return status code 400 for firstname not an alphabet and less than 2 or greater than 25', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(firstNameInvalidLength);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('First name must be an alphabet with length 2 to 25');
  });
  it('should return status code 400 for lastname not an alphabet and less than 2 or greater than 25', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(lastNameInvalidLength);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Last name must be an alphabet with length 2 to 25');
  });
  it('should return status code 400 for email less than 8 or greater than', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(emailInvalidLength);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Email address should be atleast 8 to 50 character');
  });
  it('should return status code 400 for invalid email address format', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(emailInvalidFormat);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Invalid email address format');
  });
  it('should return status code 400 for password empty', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(passwordEmpty);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('password field is required');
  });
  it('should return status code 400 for password undefined', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(passwordUndefined);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('password field is required');
  });
  it('should return status code 400 for password not a string', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(passwordNotString);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('password should be a string');
  });
  it('should return status code 400 for password not strong', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(passwordNotStrong);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Password must be minimum of 8 and maximum of 16 characters and must be with combination of special characters');   
  });
  it('should return status code 400 for password not the same', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(passwordNotSame);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Password must be the same');
  });
  it('should return status code 400 for undefined confirm password', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send(cpasswordUndefined);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Confirm password field is required');
  });
});
