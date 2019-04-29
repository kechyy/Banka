/* eslint-disable import/named */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const signUpEndPoint = '/api/v1/user/auth/signup';
const signinEndPoint = '/api/v1/user/auth/signin';
const makeStaffAdminEndPoint = '/api/v1/admin/setuser/3';
const createAccountEndPoint = '/api/v1/user/account';

let staffAdminToken;
let userToken;
let adminToken;
let accountNumber;

describe('Create token for user', () => {
  it('should return token for successful signup to be useed as staffAdmin', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send({ firstName: 'Rosemary',
        lastName: 'Emmanuel',
        email: 'rossy2@gmail.com',
        password: 'rosemary123&%',
        cpassword: 'rosemary123&%'
      });
    expect(response).to.have.status(201);
  });
  it('should return token for successful signup', async () => {
    const response = await chai.request(app)
      .post(signUpEndPoint)
      .send({ firstName: 'Rose',
        lastName: 'Emma',
        email: 'rossemma@gmail.com',
        password: 'rosemary123&%',
        cpassword: 'rosemary123&%'
      });
    expect(response).to.have.status(201);
    userToken = response.body.data.token;
  });
  it('should return token for successful signin', async () => {
    const response = await chai.request(app)
      .post(signinEndPoint)
      .send({ email: 'james2@gmail.com',
        password: 'james123#@'
      });
    expect(response).to.have.status(200);
    adminToken = response.body.data.token;
  });
  it('should return status code 200 for update setuser type to staffadmin', async () => {
    const response = await chai.request(app)
      .post(makeStaffAdminEndPoint)
      .send({ usertype: 'staffAdmin' })
      .set('authorization', adminToken);
    expect(response).to.have.status(200);
  });
});

describe('Test for deactivate and activate account controller', () => {
  it('should return status code 201 for user bank account successfully created', async () => {
    const response = await chai.request(app)
      .post(createAccountEndPoint)
      .send({ type: 'savings', email: 'rossemma@gmail.com' })
      .set('authorization', userToken);
    expect(response).to.have.status(201);
    accountNumber = response.body.data.account_number;
  });
  it('should return token for successful signin of staffAdmin', async () => {
    const response = await chai.request(app)
      .post(signinEndPoint)
      .send({ email: 'rossy2@gmail.com',
        password: 'rosemary123&%',
      });
    expect(response).to.have.status(200);
    staffAdminToken = response.body.data.token;
  });
  it('should activate account successfully', async () => {
    const response = await chai.request(app)
      .patch(`/api/v1/staffadmin/account/${accountNumber}`)
      .set('authorization', staffAdminToken);
    expect(response).to.have.status(200);
  });
  it('should turn account to dormant successfully', async () => {
    const response = await chai.request(app)
      .patch(`/api/v1/staffadmin/account/${accountNumber}`)
      .set('authorization', staffAdminToken);
    expect(response).to.have.status(200);
  });
  it('should return status code 404 for invalid account number', async () => {
    const response = await chai.request(app)
      .patch('/api/v1/staffadmin/account/0098789213')
      .set('authorization', staffAdminToken);
    expect(response).to.have.status(404);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Invalid account number');
  });
  it('should return status code 200 for successful delete', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/staffadmin/accounts/${accountNumber}`)
      .set('authorization', staffAdminToken);
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('object');
    expect(response.body.message).to.equal('Account successfully deleted');
  });
  it('should return status code 404 for invalid account number', async () => {
    const response = await chai.request(app)
      .delete('/api/v1/staffadmin/accounts/0012345678')
      .set('authorization', staffAdminToken);
    expect(response).to.have.status(404);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Something went wrong, please ensure the account supplied is valid');
  });
});
