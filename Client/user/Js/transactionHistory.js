/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
let transacTable;
const transact = document.querySelector('.transact');
const d = document.createDocumentFragment();
let open = false;
transact.addEventListener('click', (e) => {
  e.preventDefault();
  if (open === false) {
    open = true;
    document.querySelector('.transactions ul').style = 'display:block;';
  } else {
    open = false;
    document.querySelector('.transactions ul').style = 'display:none;';
  }
});
const request2 = {
  method: 'GET',
  headers: {
    Authorization: session
  }
};
const accountList = 'http://localhost:3200/api/v1/user/userAccounts';
fetch(accountList, request2)
  .then(accts => accts.json())
  .then((acctResult) => {
    acctResult.data.forEach((r) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('data-acct', r.account_number);
      const br = document.createElement('br');
      const linkText = document.createTextNode(r.account_number);
      a.appendChild(linkText);
      a.appendChild(br);
      li.appendChild(a);
      d.appendChild(li);
    });
    document.querySelector('.sideBarDropDown').appendChild(d);
    const acctList = document.querySelectorAll('[data-acct]');
    for (let i = 0; i < acctList.length; i++) {
      acctList[i].addEventListener('click', (e) => {
        e.preventDefault();
        const accountNumber = acctList[i].getAttribute('data-acct');
        const transactionUrl = `http://localhost:3200/api/v1/user/accounts/${accountNumber}/transactions`;
        fetch(transactionUrl, request2)
          .then(res => res.json())
          .then((result) => {
            title('Account Statment', 'Transaction History');
            // eslint-disable-next-line no-unused-vars
            if (result.status !== 200) {
              document.getElementById('userMain').innerHTML = `<div class="col-12-xs col-12-md table">
              <table cellpadding="0" cellspacing="0">
                  <thead>
                      <tr>
                          <th>Date</th>
                          <th>Transaction ID</th>
                          <th>Transaction type</th>
                          <th>Transaction amount</th>
                          <th>Old Balance</th>
                          <th>New Balance</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
              <tr><td colspan="7" align="center" class="err">No record Found</td></tr>
              </tbody>
            </table> 
        </div>`;
            } else {
              transacTable += `<div class="col-12-xs col-12-md table">
              <table cellpadding="0" cellspacing="0">
                  <thead>
                      <tr>
                          <th>Date</th>
                          <th>Transaction ID</th>
                          <th>Transaction type</th>
                          <th>Transaction amount</th>
                          <th>Old Balance</th>
                          <th>New Balance</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>`;
              result.forEach((t) => {
                transacTable += `
                    <tr>
                        <td class="responsiveTitle">Date</td>
                        <td>${t.data.transaction_date}</td>
                        <td>Previous Balance</td>
                        <td class="responsiveTitle">Transaction ID</td>
                        <td>${t.data.transaction_id}</td>
                        <td class="responsiveTitle">Transaction type</td>
                        <td>${t.data.transaction_type}</td>
                        <td class="responsiveTitle">Transaction amount</td>
                        <td>${t.data.amount}</td>
                        <td class="responsiveTitle">Old Balance</td>
                        <td>${t.data.old_balance}</td>
                        <td class="responsiveTitle">Old Balance</td>
                        <td>${t.data.new_balance}</td>
                        <td><button class="btn btn-blue">View</button></td>
                    </tr>`;
              });
              transacTable += `</tbody>
            </table> 
        </div>`;
              document.getElementById('userMain').innerHTML = transacTable;
            }
          });
      });
    }
  })
  .catch((error) => {
    console.log('Request failed', error);
  });
