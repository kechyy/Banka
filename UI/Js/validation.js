// This function Handles login form  validation
'use strict'
class validateUser{
    constructor(){
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
    }
    login(){
        // (?=.*[0-9]) - Assert a string has at least one number;
        // (?=.*[!@#$%^&*]) - Assert a string has at least one special character.
        const ERegPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/;
        if(!email.value){
            customNotify.show('<span class="msg">Email field cannot be empty','<h3 class="err"> Error</h3>');
            return;
        }
        if(!password.value){
            customNotify.show('<span class="msg">Password field cannot be empty','<h3 class="err"> Error</h3>');
            return;
        }
        if(password.value.length < 6){
            customNotify.show('<span class="msg">Password length cannot be less than 6 characters','<h3 class="err"> Error</h3>');
            return;
        }
        if(!ERegPassword.test(password.value)){
            customNotify.show('<span class="msg">Insecured password. Minimum of 8 character with combination of special character is required','<h3 class="err"> Error</h3>');
            return;
        }
    }
    signUp(){

    }
}
const {login} = new validateUser();
