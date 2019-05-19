/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
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

const userUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/admin/users';
// const userUrl = 'http://localhost:8000/api/v1/admin/users';
const viewTransactionUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/staffAdmin/accounts';
// const viewTransactionUrl = 'http://localhost:8000/api/v1/cashier/allTransactions';
const accountsUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/bankAccounts';
// const accountsUrl = 'http://localhost:8000/api/v1/staffadmin/bankAccounts';
let searchUrl = '';
const acctSearchKeywords = (searchAccountType, searchEmailField) => {
  switch (searchAccountType) {
    case 'searchByAll': searchUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/bankAccounts';
    // case 'searchByAll': searchUrl = 'http://localhost:8000/api/v1/staffadmin/bankAccounts';
      break;
    case 'searchByEmail': searchUrl = `https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/user/${searchEmailField}/accounts`;
    // case 'searchByEmail': searchUrl = `http://localhost:8000/api/v1/staffadmin/user/${searchEmailField}/accounts`;
      break;
    case 'searchByActive': searchUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/accounts?status=active';
    // case 'searchByActive': searchUrl = 'http://localhost:8000/api/v1/staffadmin/accounts?status=active';
      break;
    case 'searchByDormant': searchUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/accounts?status=dormant';
    // case 'searchByDormant': searchUrl = 'http://localhost:8000/api/v1/staffadmin/accounts?status=dormant';
      break;
    default: searchUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/bankAccounts';
      // default: searchUrl = 'http://localhost:8000/api/v1/staffadmin/bankAccounts';
  }
};

const requests = {
  method: 'GET',
  headers: {
    Authorization: session
  }
};
const requestPatch = {
  method: 'PATCH',
  headers: {
    Authorization: session
  }
};
const requestDelete = {
  method: 'DELETE',
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
// eslint-disable-next-line prefer-const
let k = 1;
const acctDetails = (accountDetails, btnColor, actionBtn, k) => {
  if (accountDetails.account_status === 'active') {
    actionBtn = 'Deactivate';
    btnColor = 'btn-gray';
  } else if (accountDetails.account_status === 'dormant') {
    actionBtn = 'Activate';
    btnColor = 'btn-green';
  }
  return `<tr>
            <td>${k++}</td>
            <td>${accountDetails.account_number}</td>
            <td>${accountDetails.email}</td>
            <td>${accountDetails.account_type}</td>
            <td>${accountDetails.balance}</td>
            <td>${accountDetails.account_status}</td>
            <td><a href="javascript:;" class="btn ${btnColor} btn-sm actionDeactivateActivate" data-ids="${accountDetails.account_number}">${actionBtn}</a></td>
            <td><a href="javascript:;" class="btn btn-pink btn-sm deleteActions" data-delAcctIds="${accountDetails.account_number}">Delete</a></td>
          </tr>`;
};

const staffAdminActions = (actionDeactivateActivate) => {
  for (let i = 0; i < actionDeactivateActivate.length; i++) {
    actionDeactivateActivate[i].addEventListener('click', () => {
      const getText = actionDeactivateActivate[i].textContent;
      customConfirm.show(`Are you really sure you want to ${getText} this account?`,
        'WARNING<br/><span class="fa fa-warning err"></span>', () => {
          const acctIds = actionDeactivateActivate[i].getAttribute('data-ids');
          fetch(`https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/account/${acctIds}`, requestPatch)
          // fetch(`http://localhost:8000/api/v1/staffadmin/account/${acctIds}`, requestPatch)
            .then(res => res.json())
            .then((result) => {
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    });
  }
};
const staffAdminDeleteAction = (actionDelete) => {
  for (let i = 0; i < actionDelete.length; i++) {
    actionDelete[i].addEventListener('click', () => {
      customConfirm.show('Are you really sure you want to delete this account?',
        'WARNING<br/><span class="fa fa-warning err"></span>', () => {
          const delAcctIds = actionDelete[i].getAttribute('data-delAcctIds');
          fetch(`https://kechyy-banka-app.herokuapp.com/api/v1/staffadmin/accounts/${delAcctIds}`, requestDelete)
          // fetch(`http://localhost:8000/api/v1/staffadmin/accounts/${delAcctIds}`, requestDelete)
            .then(res => res.json())
            .then((result) => {
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    });
  }
};
