import { read } from "fs";

class UserAuthValidation {
  
  static signUpValidate(req, res, next){
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let {firstName, lastName, email, password, cpassword} = req.body;
    if(firstName === '' || firstName === undefined) {
      return res.status(400).json(
        {
          "status": '400', 
          "error" : 'First name is required'
        }
      )
    }
    if(lastName === '' || lastName === undefined) {
      return res.status(400).json(
        {
          "status": "400", 
          "error" :'Last name is required'
        }
      )
    }
    if(email === '' || email === undefined) {
      return res.status(400).json(
        {
          "status": "400", 
          "error" :'Email address is required'
        }
      )
    }
    if(password === '' || password === undefined) {
      return res.status(400).json({
          "status": "400", 
          "error" :'First name is required'
        })
    }
    firstName = firstName.trim(); 
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    cpassword = cpassword.trim();
  
    if(!/^([A-Za-z-]){2,25}$/.test(firstName)) {
      return  res.status(400).json({
          "status": '400',
          "error": 'First name must be an alphabet with length 2 to 25' 
        })
    }
    if(! /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/.test(password)) {
      return  res.status(400).json({
          "status": '400',
          "error": 'Password must be minimum of 8 and maximum of 16 characters and must be with combination of special characters' 
        })
    }
    if(! emailRegex.test(String(email).toLowerCase())) {
      return  res.status(400).json({
          "status": '400',
          "error": 'Invalid email address format' 
        })
    }
    if(cpassword !== password) {
      return  res.status(400).json({
          "status": '400',
          "error": 'Password must be the same' 
        })
    }
    
   
    req.body.firstName = firstName;
    req.body.lastName = lastName;
    req.body.email = email;
    req.body.password = password;
    next();
  }

  static signInValidate(req, res, next){
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let {email, password} = req.body;
    if(email === undefined || email === ""){
      return res.status(400).json({
        "status": '400',
        "error":'Email address is required'
      })
    }
    if(password === '' || password === undefined) {
      return res.status(400).json({
          "status": "400", 
          "error" :'First name is required'
        })
    }
    email = email.trim();
    password = password.trim();
   
    if(! emailRegex.test(String(email).toLowerCase())) {
      return  res.status(400).json({
          "status": '400',
          "error": 'Invalid email address format' 
        })
    }
    if(! /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/.test(password)) {
      return  res.status(400).json({
          "status": '400',
          "error": 'Password must be minimum of 8 and maximum of 16 characters and must be with combination of special characters' 
        })
    }
    req.body.email = email;
    req.body.password = password;
    next();
  }
}
const {signUpValidate, signInValidate} = UserAuthValidation;
export {signUpValidate,signInValidate};