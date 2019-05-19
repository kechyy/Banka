import pool from '../db/connection';

class AdminValidation {
  static async adminSignUpValidate(req, res, next) {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let {
      firstName, lastName, email, usertype
    } = req.body;
    if (firstName === '' || firstName === undefined) {
      return res.status(400).json(
        {
          status: 400,
          error: 'First name field is required'
        }
      );
    }
    if (lastName === '' || lastName === undefined) {
      return res.status(400).json(
        {
          status: 400,
          error: 'Last name field is required'
        }
      );
    }
    if (email === '' || email === undefined) {
      return res.status(400).json(
        {
          status: 400,
          error: 'Email address field is required'
        }
      );
    }
    if (usertype === '' || usertype === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'usertype field is required'
      });
    }
    if (typeof firstName !== 'string') {
      return res.status(400).json({
        status: '400',
        error: 'FirstName should be a string'
      });
    }
    if (typeof lastName !== 'string') {
      return res.status(400).json({
        status: '400',
        error: 'LastName should be a string'
      });
    }
    if (typeof email !== 'string') {
      return res.status(400).json({
        status: '400',
        error: 'Email address should be a string'
      });
    }
    if (usertype !== 'admin' && usertype !== 'staffAdmin' && usertype !== 'cashier' && usertype !== 'client') {
      return res.status(400).json({
        status: '400',
        error: 'Invalid User type'
      });
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    usertype = usertype.trim();

    if (email.length < 8 || email.length > 50) {
      return res.status(400).json({
        status: '400',
        error: 'Email address should be atleast 8 to 50 character'
      });
    }
    if (!/^([A-Za-z-]){2,25}$/.test(firstName)) {
      return res.status(400).json({
        status: '400',
        error: 'First name must be an alphabet with length 2 to 25'
      });
    }
    if (!/^([A-Za-z-]){2,25}$/.test(lastName)) {
      return res.status(400).json({
        status: '400',
        error: 'Last name must be an alphabet with length 2 to 25'
      });
    }
    if (!emailRegex.test(String(email).toLowerCase())) {
      return res.status(400).json({
        status: '400',
        error: 'Invalid email address format'
      });
    }
    const checkUserExist = await pool.query('SELECT email FROM users WHERE email=$1', [email]);
    if (checkUserExist.rowCount === 1) {
      return res.status(409).json({
        status: 409,
        error: 'User already exist',
      });
    }
    req.body.firstName = firstName;
    req.body.lastName = lastName;
    req.body.email = email;
    req.body.usertype = usertype;
    next();
  }

  static updateUserValidation(req, res, next) {
    let { usertype } = req.body;
    let { userid } = req.params;
    console.log(userid);
    if (!usertype) {
      return res.status(400).json({ status: '400', error: 'Usertype field is required' });
    }
    usertype = usertype.trim();
    userid = userid.trim();
    if (usertype !== 'client' && usertype !== 'cashier' && usertype !== 'staffAdmin' && usertype !== 'admin') {
      return res.status(400).json({ status: '400', error: 'Invalid usertype' });
    }
    
    // console.log(typeof userid)
    // if (!/^[0-9]$/.test(userid)) {
    //   return res.status(400).json({ status: '400', error: 'userid must be a number' });
    // }
    req.body.usertype = usertype;
    req.params.userid = userid;
    next();
  }
}
const { updateUserValidation, adminSignUpValidate } = AdminValidation;
export { updateUserValidation, adminSignUpValidate };
