import { read } from "fs";

class accountValidation {
  static accountValidate(req, res, next){
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let {firstName, lastName, email, type} = req.body;
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
    if(type === '' || type === undefined) {
      return res.status(400).json({
          "status": "400", 
          "error" :'User type is required'
        })
    }
    firstName = firstName.trim(); 
    lastName = lastName.trim();
    email = email.trim();
    type = type.trim();
  
    if(!/^([A-Za-z-]){2,25}$/.test(firstName)) {
      return  res.status(400).json({
          "status": '400',
          "error": 'First name must be an alphabet with length 2 to 25' 
        })
    }
    if(!/^([A-Za-z-]){2,25}$/.test(lastName)) {
      return  res.status(400).json({
          "status": '400',
          "error": 'Last name must be an alphabet with length 2 to 25' 
        })
    }
    if(! emailRegex.test(String(email).toLowerCase())) {
      return  res.status(400).json({
          "status": '400',
          "error": 'Invalid email address format' 
        })
    }
    
    if(! /^[a-zA-Z]{7}$/.test(type)) {
      return  res.status(400).json({
          "status": '400',
          "error": 'User type must be minimum of 7 characters and must be an alphabet' 
        })
    }
    
    if(type != 'savings' && type != 'current') {
      return  res.status(400).json({
          "status": '400',
          "error": 'User type must be either savings or current account' 
        })
    }
   
    req.body.firstName = firstName;
    req.body.lastName = lastName;
    req.body.email = email;
    req.body.type = type;

    next();
  }

}
const {accountValidate} = accountValidation;
export default accountValidate;