
import randomize from 'randomatic';
import {userSignUp} from '../data';

class UserController {
    static signUp(req, res){
        req.body.token =  randomize('a0',20);
        const {token, firstName, lastName, email, password} = req.body
        const id = userSignUp[userSignUp.length-1].id + 1
        const userInfo = {token, id, firstName, lastName, email, password}
        const checkUserExist = userSignUp.find(user=>user.email === email)
        if(checkUserExist !== undefined) {
            return  res.status(409).json({
                "status": '409',
                "error": 'User already exist' 
            })
        }

        userSignUp.push(userInfo);
        const data = userSignUp[userSignUp.length - 1];
        return res.json({status: '201', data});
    }

    static signIn(req, res){
        const {email, password} = req.body;
        const confirmUser = userSignUp.find(loginUser=>loginUser.email === email && loginUser.password === password);
        if(confirmUser == undefined){
            return res.status(404).json({
                "status": '404',
                "error": 'Invalid user login credentials'
            })
        }
        return res.json({status: '200', data: confirmUser})
    }
}

const {signUp, signIn} = UserController;

export {signUp, signIn};