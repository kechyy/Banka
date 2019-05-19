/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
// let usertype;
let accountHead = ''; let accountBody = ''; let accountFooter = ''; let accountSearchForm = '';
let actionBtn = ''; let btnColor = '';
const manageAccounts = () => new Promise((resolve, reject) => {
  fetch(accountsUrl, requests)
    .then(res => res.json())
    .then((result) => {
      title('Manage Accounts', 'User Bank Accounts');
      // let j = 1;
      accountSearchForm = `<div class="col-12-xs col-12-md table"><form id="searchForm"><div class="row bg-gray-light" id="testing">
      <div class="col-3-md col-12-xs strechFlex">
        <select name="searchAccountType" id="searchAccountType" class="input-block" required>
          <option value="">Select Bank Account Search Criteria</opiton>
          <option value="searchByAll">Display All Accounts</opiton>
          <option value="searchByEmail">Search By Email Address</opiton>
          <option value="searchByActive">Search By Active Account</opiton>
          <option value="searchByDormant">Search By Dormant Account</opiton>
        <select>
      </div>
      <div class="col-6-md col-12-xs searchEmail">
        <input type="email" placeholder="Enter email address search keyword" name="searchAccount" class="input-block" id="searchEmailField">
      </div>
      <div class="col-3-md col-6-xs"><input type="submit" class="input-block btn btn-blue" value="Search" id="searchBtn"></div>
    </div></form></div>`;
      accountHead = `<div class="col-12-xs col-12-md table">
    <table>
       <thead>
          <tr>
          <th>S/N</td>
          <th>Account Number</th>
          <th>Email Address</th>
          <th>Account Type</th>
          <th>Balance</th>
          <th>Account Status</th>
          <th>Action</th>
          <th>Delete Action</th>
          </tr>
      </thead>
      <tbody  id="bodyDisplay">`;
      if (result.status !== 200) {
        accountBody = '<tr><td colspan="7" class="text-center text-medium-size text-red">No Record Found</td></tr>';
      } else {
        result.data.forEach((accountDetails) => {
          accountBody += acctDetails(accountDetails, btnColor, actionBtn, k++);
        });
      }
      accountFooter = `</tbody>
  </table>
    </div>`;
      resolve(document.getElementById('staffAdminMain').innerHTML = accountSearchForm + accountHead + accountBody + accountFooter);
    });
});
