/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
// This function Handles login form  validation
class validateUser {
  constructor() {
    this.firstName = document.getElementById('firstName');
    this.lastName = document.getElementById('lastName');
    this.email = document.getElementById('email');
    this.password = document.getElementById('password');
  }

  login() {
    // cancelBubble(event)
    // (?=.*[0-9]) - Assert a string has at least one number;
    // (?=.*[!@#$%^&*]) - Assert a string has at least one special character.
    const ERegPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value) {
      customNotify.show('<p class="msg">Email field cannot be empty</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (!password.value) {
      customNotify.show('<p class="msg">Password field cannot be empty</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (!emailRegex.test(email.value)) {
      customNotify.show('<p class="msg">Invalid email format</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (password.value.length < 6) {
      customNotify.show('<p class="msg">Password length cannot be less than 6 characters</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (!ERegPassword.test(password.value)) {
      customNotify.show(`<p class="msg">Insecured password. Minimum of 8 character 
      with combination of special character is required</p>`, '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
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
          customNotify.show(`<p class="msg">${result.error}</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>`);
        } else {
          customNotify.show(`<p class="msg">${result.data.token}</p>','<h3 class="suces"> Success<span class="fa fa-check msgSign"></span></h3>`);
        }
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  signUp() {
    if (!firstName.value) {
      customNotify.show('<p class="msg">First name field cannot be empty</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (!lastName.value) {
      customNotify.show('<p class="msg">Last name field cannot be empty</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    } if (!email.value) {
      customNotify.show('<p class="msg">Email address field cannot be empty</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
      return;
    }
    if (!password.value) {
      customNotify.show('<p class="msg">Password field cannot be empty</p>', '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
    }
  }
}

const {
  // eslint-disable-next-line no-unused-vars
  login, signUp
} = new validateUser();
