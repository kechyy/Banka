/* eslint-disable no-undef */
const Accountrequest = {
  method: 'GET',
  headers: {
    Authorization: sessionStorage.getItem('Authorization')
  }
};
const url2 = 'http://localhost:3200/api/v1/user/profile';
// const url2 = 'https://kechyy-banka-app.herokuapp.com/api/v1/user/profile';
const acctForm = document.querySelector('.accountForms');
acctForm.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(url2, Accountrequest)
    .then(response => response.json())
    .then((result) => {
      // eslint-disable-next-line no-undef
      title('Account Information', 'Create Bank Account');
      const accountForm = `<div class="row createAcct">
    <div class="col-6-md col-12-xs">
        <label for="">First Name</label>
        <input type="text" class="input-block" value="${result.data.firstname}" disabled>
    </div>
    <div class="col-6-md col-12-xs">
        <label for="">Last Name</label>
        <input type="text" class="input-block" value="${result.data.lastname}"  disabled>
    </div>
    <div class="col-6-md col-12-xs">
        <label for="">Email Address</label>
        <input type="text" class="input-block" value="${result.data.email}"  disabled>
    </div>
    <div class="col-6-md col-12-xs">
        <label for="accountType" class="required">Account type <span>*</span></label>
        <select class="input-block" required id="type" name="type">
            <option value="">--Select Account Type--</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
        </select>
    </div>
    <div class="col-6-md col-12-xs">
        <label for="uploadDoc" class="required">Upload Document <span>*</span></label>
        <input type="file" class="input-block removeMarginBottom" id="uploadDoc" name="uploadDoc" required>
    </div>
    <div class="col-6-md col-12-xs">
        <p class="alert-red">You are expected to upload proof of identification (BVN)</p>
    </div>
    <div class="col-6-md col-12-xs">
        <input type="submit" class="btn btn-blue createAccountBtn" id="createAccountBtn" value="Create Account">
    </div>
</div>`;
      document.getElementById('userMain').innerHTML = accountForm;
      const createAccountBtn = document.querySelector('.createAccountBtn');
      createAccountBtn.addEventListener('click', () => {
        const type = document.querySelector('#type');
        const acctUrl = 'http://localhost:3200/api/v1/user/account';
        // const acctUrl = 'https://kechyy-banka-app.herokuapp.com/api/v1/user/account';
        const session = sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '';
        const reqBody = { type: type.value };
        const request = {
          method: 'POST',
          body: JSON.stringify(reqBody),
          headers: {
            'Content-type': 'application/json',
            Authorization: session
          }
        };
        fetch(acctUrl, request)
          .then(response => response.json())
          .then((report) => {
            if (report.status === '201') {
              return customNotify.show('<p class="msg suces">Account successfully created</p>',
                '<h3 class="suces"> Success<br/><span class="fa fa-check msgSign"></span></h3>');
            }
            return customNotify.show(`<p class="msg">${report.error}</p`,
              '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
          });
      });
    })
    .catch((error) => {
      console.log('Request failed', error);
    });
});
