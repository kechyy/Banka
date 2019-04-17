import { tokenGenerator } from '../middleware/authorize';
import { userSignUp } from '../data';

class UserController {
  static signUp(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    const id = userSignUp[userSignUp.length - 1].id + 1;
    const token = tokenGenerator(id);
    const userInfo = {
      id, firstName, lastName, email, password
    };
    const checkUserExist = userSignUp.find(user => user.email === email);
    if (checkUserExist) {
      return res.status(409).json({
        status: 409,
        error: 'User already exist',
      });
    }
    userSignUp.push(userInfo);
    userSignUp[userSignUp.length - 1].token = token;
    const data = userSignUp[userSignUp.length - 1];
    return res.status(201).json({ status: '201', data });
  }

  static signIn(req, res) {
    const { email, password } = req.body;
    const confirmUser = userSignUp.find(loginUser => loginUser.email === email
      && loginUser.password === password);
    if (!confirmUser) {
      return res.status(404).json({
        status: '404',
        error: 'Please enter a valid username and password'
      });
    }
    confirmUser.token = tokenGenerator(confirmUser.id);
    const data = confirmUser;
    return res.status(200).json({ status: '200', data });
  }
}

const { signUp, signIn } = UserController;

export { signUp, signIn };
