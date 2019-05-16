/* eslint-disable no-unused-vars */
const session = sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '';

// const TokenUrl = 'http://localhost:8000/api/v1/protectedEndPoints';
const TokenUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/protectedEndPoints';

// const profileUrl = 'http://localhost:8000/api/v1/user/profile';
const profileUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/user/profile';

// const accountUrl = 'http://localhost:8000/api/v1/user/account';
const accountUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/user/account';

const accountList = 'https://kechyy-banka-app.herokuapp.com/api/v1/user/userAccounts';
// const accountList = 'http://localhost:8000/api/v1/user/userAccounts';

const createUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/admin/auth/createUser';
// const createUrl = 'http://localhost:8000/api/v1/admin/auth/createUser';

const userURl = 'https://kechyy-banka-app.herokuapp.com/api/v1/admin/users';
// const userUrl = 'http://localhost:8000/api/v1/admin/users';
const viewTransactionUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/staffAdmin/accounts';
// const viewTransactionUrl = 'http://localhost:8000/api/v1/cashier/allTransactions';

const requests = {
  method: 'GET',
  headers: {
    Authorization: session
  }
};
fetch(TokenUrl, requests)
  .then(report => report.json())
  .then((res) => {
    if (res.error === 'Please supply a token') {
      window.location.href = '../index.html';
    }
  })
  .catch((error) => {
    console.log('Request failed', error);
  });

const title = (maintTitle, subTitle) => {
  document.getElementById('contentMainTitle').innerHTML = maintTitle;
  document.getElementById('contentSubTitle').innerHTML = subTitle;
};

