/* eslint-disable indent */
/* eslint-disable no-undef */
const newUserForm = `<div class="row createAcct">
<div class="col-6-md col-12-xs">
    <label for="">First Name</label>
    <input type="text" class="input-block" name="firstName" id="firstName" placeholder="Enter Firstname">
</div>
<div class="col-6-md col-12-xs">
    <label for="">Last Name</label>
    <input type="text" class="input-block" minlength="3" name="lastName" id="lastName" placeholder="Enter Lastname">
</div>
<div class="col-6-md col-12-xs">
    <label for="">Email Address</label>
    <input type="email" class="input-block" name="email" id="email" placeholder="Enter Email Address">
</div>
<div class="col-6-md col-12-xs">
    <label for="accountType" class="required">User type <span>*</span></label>
    <select class="input-block" id="usertype" name="usertype">
      <option value="">--Select User Type--</option>
      <option value="client">Client</option>
      <option value="admin">Admin</option>
      <option value="staffAdmin">Staff Admin</option>
      <option value="cashier">Cashier</option>
    </select>
</div>
<div class="col-6-md col-12-xs">
    <input type="submit" class="btn btn-blue createAccountBtn" id="createAccountBtn" value="Create New User">
</div>
</div>
`;
const newUserBtn = document.querySelector('.newUserBtn');
newUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  title('Manage User', 'Create New User');
  document.getElementById('adminMain').innerHTML = newUserForm;
  createAccountBtn = document.querySelector('.createAccountBtn');
  createAccountBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');
    const usertype = document.querySelector('#usertype');
    if (!firstName.value) {
      customNotify.show('<p class="msg">First name field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (!lastName.value) {
      customNotify.show('<p class="msg">Last name field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    } if (!email.value) {
      customNotify.show('<p class="msg">Email address field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (!usertype.value) {
      return customNotify.show('<p class="msg">Usertype field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    const url = 'https://kechyy-banka-app.herokuapp.com/api/v1/admin/auth/createUser';
    // const url = 'http://localhost:3200/api/v1/admin/auth/createUser';
    const reqBody = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      usertype: usertype.value,
    };
    const request = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-type': 'application/json',
        Authorization: session
      }
    };
    fetch(url, request)
      .then((response) => {
        return response.json();
      })
      .then((resul) => {
        if (resul.status === 201) {
          return manageUsers();
        }
        return customNotify.show(`<p class="msg">${resul.error}</p>`,
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      })
      .catch((error) => {
        console.log('Request failed', error.message);
      });
  });
});
