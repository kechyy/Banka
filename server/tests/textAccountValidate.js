/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { typeNameEmpty, acctTypeUndefined, InvalidAccType, InvalidAccountNumber
} from './mockObjects/accountObjectData';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const accountEndPoint = '/api/v1/account';
const accountUpdateEndPoint = '/api/v1/account/098789';
const accountDeleteEndPoint = '/api/v1/account/098789';

describe.only('Test for account validation', () => {
  it('should return status code 400 for account type empty', async () => {
    const response = await chai.request(app)
      .post(accountEndPoint)
      .send(typeNameEmpty);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('User type is required');
  });
  it('should return status code 400 for account type undefined', async () => {
    const response = await chai.request(app)
      .post(accountEndPoint)
      .send(acctTypeUndefined);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('User type is required');
  });
  it('should return status code 400 for account type not current or savings', async () => {
    const response = await chai.request(app)
      .post(accountEndPoint)
      .send(InvalidAccType);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Account type must be either savings or current account');
  });
  it('should return status code 400 for invalid account number', async () => {
    const response = await chai.request(app)
      .patch(accountUpdateEndPoint)
      .send(InvalidAccountNumber);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Account number must be 10 digit number');
  });
  it('should return status code 400 for invalid account number', async () => {
    const response = await chai.request(app)
      .delete(accountDeleteEndPoint)
      .send(InvalidAccountNumber);
    expect(response).to.have.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.error).to.equal('Account number must be 10 digit number');
  });
});
