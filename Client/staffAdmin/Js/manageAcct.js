/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable default-case */
manageAccounts().then(() => {
  let actionDeactivateActivate = document.querySelectorAll('.actionDeactivateActivate');
  let actionDelete = document.querySelectorAll('.deleteActions');
  const searchAccountType = document.getElementById('searchAccountType');
  const searchForm = document.getElementById('searchForm');
  const searchEmail = document.querySelector('.searchEmail');
  const searchEmailField = document.getElementById('searchEmailField');
  searchAccountType.addEventListener('change', () => {
    if (searchAccountType.value !== 'searchByEmail') {
      searchEmail.style.display = 'none';
    } else {
      searchEmail.style.display = 'block';
    }
  });
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (searchAccountType.value === 'searchByEmail' && searchEmailField.value === '') {
      customNotify.show(`<p class="msg">Please supply search email</p>',
      '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>`);
      return;
    }
    acctSearchKeywords(searchAccountType.value, searchEmailField.value);
    fetch(searchUrl, requests)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        accountBody = '';
        k = 1;
        if (result.status !== 200) {
          accountBody = '<tr><td colspan="7" class="text-center text-medium-size text-red">No Record Found</td></tr>';
        } else {
          result.data.forEach((accountDetails) => {
            accountBody += acctDetails(accountDetails, btnColor, actionBtn, k++);
          });
        }
        document.getElementById('bodyDisplay').innerHTML = accountBody;
        actionDeactivateActivate = document.querySelectorAll('.actionDeactivateActivate');
        actionDelete = document.querySelectorAll('.deleteActions');
        staffAdminActions(actionDeactivateActivate);
        staffAdminDeleteAction(actionDelete);
      });
  });
  staffAdminActions(actionDeactivateActivate);
  staffAdminDeleteAction(actionDelete);
});
