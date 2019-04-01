
import userSignUp from '../data';

class UserController {

    static signUp(req, res){
        const {firstName, lastName, email, password} = req.body
        const id = userSignUp[userSignUp.length-1].id + 1
        const userInfo = {id, firstName, lastName, email, password}
        const checkUserExist = userSignUp.find(user=>user.email === email)
        if(checkUserExist !== undefined) {
            return  res.status(500).json({
                "status": '500',
                "error": 'User already exist' 
            })
        }
        userSignUp.push(userInfo)
        return res.json({ userSignUp })
    }

    static signIn(req, res){
        const {email, password} = req.body;
        const confirmUser = userSignUp.find(loginUser=>loginUser.email === email && loginUser.password === password);
        if(confirmUser == undefined){
            return res.status(500).json({
                "statis": '500',
                "error": 'Invalid user login credentials'
            })
        }
        return res.json(confirmUser)
    }
}

const {signUp, signIn} = UserController;

export {signUp, signIn};