/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
// This function Handles login form  validation
class UserAuth {
  constructor() {
    this.firstName = document.getElementById('firstName');
    this.lastName = document.getElementById('lastName');
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
    this.cpassword = document.getElementById('cpassword');
  }

  login() {
    // cancelBubble(event)
    // (?=.*[0-9]) - Assert a string has at least one number;
    // (?=.*[!@#$%^&*]) - Assert a string has at least one special character.
    const ERegPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value) {
      return customNotify.show('<p class="msg">Email field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    if (!password.value) {
      return customNotify.show('<p class="msg">Password field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    if (!emailRegex.test(email.value)) {
      return customNotify.show('<p class="msg">Invalid email format</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    if (password.value.length < 6) {
      return customNotify.show('<p class="msg">Password length cannot be less than 6 characters</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    if (!ERegPassword.test(password.value)) {
      customNotify.show(`<p class="msg">Insecured password. Minimum of 8 character 
      with combination of special character is required</p>`,
      '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    const url = 'http://localhost:3200/api/v1/user/auth/signin';
    const reqBody = { email: email.value, password: password.value };
    const request = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-type': 'application/json'
      }
    };

    fetch(url, request)
      .then(response => response.json())
      .then((result) => {
        if (result.error) {
          return customNotify.show(`<p class="msg">${result.error}</p>',
          '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>`);
        }
        if (typeof (Storage) !== 'undefined') {
          switch (result.data.usertype) {
            case 'admin': window.location.href = 'admin/userAccount.html';
              break;
            case 'client': window.location.href = 'user/dashboard.html';
              break;
            case 'cashier': window.location.href = 'cashier/allUserAccount.html';
              break;
            case 'staffAdmin': window.location.href = 'staffAdmin/creditAccount.html';
              break;
          }
        } else {
          customNotify.show(`<p class="msg">Sorry! No web storage support</p>',
          '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>`);
        }
      })
      .catch((error) => {
        customNotify.show(`<p class="msg">Sorry! Request failed [${error}]</p>',
          '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>`);
      });
  }

  signUp() {
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
    if (!password.value) {
      return customNotify.show('<p class="msg">Password field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    if (!cpassword.value) {
      return customNotify.show('<p class="msg">Confirm password field cannot be empty</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    if (cpassword.value !== password.value) {
      return customNotify.show('<p class="msg">Password must be the same</p>',
        '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
    const url = 'http://localhost:3200/api/v1/user/auth/signup';
    const reqBody = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      cpassword: cpassword.value
    };
    const request = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-type': 'application/json'
      }
    };
    fetch(url, request)
      .then(response => response.json())
      .then((result) => {
        if (result.error) {
          return customNotify.show(`<p class="msg">${result.error}</p>',
          '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>`);
        }
        window.location.href = 'user/dashboard.html';
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }
}

const {
  // eslint-disable-next-line no-unused-vars
  login, signUp
} = new UserAuth();
