/* eslint-disable object-curly-newline */
class UserAuthValidation {
  static signUpValidate(req, res, next) {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let { firstName, lastName, email, password, cpassword } = req.body;
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
    if (password === '' || password === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'password field is required'
      });
    }
    if (cpassword === '' || cpassword === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Confirm password field is required'
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
    if (typeof password !== 'string') {
      return res.status(400).json({
        status: '400',
        error: 'password should be a string'
      });
    }
    if (typeof cpassword !== 'string') {
      return res.status(400).json({
        status: '400',
        error: 'cpassword should be a string'
      });
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    cpassword = cpassword.trim();
    
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
    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/.test(password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 8 and maximum of 16 characters and must be with combination of special characters'
      });
    }
    if (!emailRegex.test(String(email).toLowerCase())) {
      return res.status(400).json({
        status: '400',
        error: 'Invalid email address format'
      });
    }
    if (cpassword !== password) {
      return res.status(400).json({
        status: '400',
        error: 'Password must be the same'
      });
    }
    req.body.firstName = firstName;
    req.body.lastName = lastName;
    req.body.email = email;
    req.body.password = password;
    next();
  }

  static signInValidate(req, res, next) {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let { email, password } = req.body;
    if (email === undefined || email === '') {
      return res.status(400).json({
        status: '400',
        error: 'Email address is required'
      });
    }
    if (password === '' || password === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'First name is required'
      });
    }
    email = email.trim();
    password = password.trim();
    if (!emailRegex.test(String(email).toLowerCase())) {
      return res.status(400).json({
        status: '400',
        error: 'Invalid email address format'
      });
    }
    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/.test(password)) {
      return res.status(400).json({
        status: '400',
        error: 'Password must be minimum of 8 and maximum of 16 characters and must be with combination of special characters'
      });
    }
    req.body.email = email;
    req.body.password = password;
    next();
  }
}
const { signUpValidate, signInValidate } = UserAuthValidation;
export { signUpValidate, signInValidate };
