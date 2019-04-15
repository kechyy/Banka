/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

// Get modal element
const modal = document.querySelector('.modal');

class modalAction {
  static logins() {
    modal.innerHTML = loginModal;
    modal.style.display = 'block';
  }

  static signUps() {
    modal.innerHTML = signUpModal;
    modal.style.display = 'block';
  }

  static modalCloses() {
    modal.style.display = '';
  }
}


const {
  logins, signUps, modalCloses
} = modalAction;

const signIn = document.querySelector('#sign_in');
signIn.addEventListener('click', () => {
  logins();
});

const loginModal = `
<div class=" modal-content">
    <header>
      <a href="javascript:;" title="Close" class="modal-close" onclick="modalCloses()">&times;</a>
      <h1>LOGIN HERE</h1>
      <p>Enter your login credentials to access this application</p>
    </header>
    <div class="modal-body">
      <div class="row loginForm">
        <label>Email Address</label>
        <div class="col-12-xs"><input type="email" class="input-block" name="email" required id="email" placeholder="Enter email address"></div>
        <label>Password</label>
        <div class="col-12-xs"><input type="password" class="input-block" minlength="6" required name="password" id="password" placeholder="Enter password"></div>
        <div class="col-12-xs"><button class="btn btn-pink btn-full"   onclick="login()">Sign in</button><br/><br/>
        <a href="javascript:;" class="sign" onclick="signUps()">Don't have an account? <span  class="text-blue">[SIGN UP]</span></a>
        </div>
      </div>
    </div>
</div>
`;

const signUpModal = `
  <div class=" modal-content">
      <header>
        <a href="javascript:;" title="Close" onclick="modalCloses()" class="modal-close">&times;</a>
        <h1>USER SIGN UP PAGE</h1>
        <p>Enter Your Sign-Up Details To Create An Account</p>
      </header>
      <div class="modal-body">
        <div class="row loginForm">
        <label>First Name</label>
        <div class="col-12-xs"><input type="text" class="input-block" minlength="3" name="firstName" required id="firstName" placeholder="Enter first name"></div>
        <label>Last Name</label>
        <div class="col-12-xs"><input type="test" class="input-block" minlength="3" required name="lastName" id="lastName" placeholder="Enter Last name"></div>
          <label>Email Address</label>
          <div class="col-12-xs"><input type="email" class="input-block" name="email" required id="email" placeholder="Enter email address"></div>
          <label>Password</label>
          <div class="col-12-xs"><input type="password" class="input-block" minlength="6" required name="password" id="password" placeholder="Enter password"></div>
          <div class="col-12-xs"><button class="btn btn-pink btn-full"   onclick="signUp()">Sign Up</button><br/>
          <br/>
          <a href="javascript:;" class="sign"  onclick="logins()">Existing user <span class="text-blue"> [SIGN-IN]</span></a>
          </div>
        </div>
      </div>
  </div>

`;
// modal2.addEventListener('click',modalCloses2,true)
// function modalCloses2(event){
//   event.stopPropagation()
//   console.log("Parent clicked");
// modal.style.display = "";
//   }
