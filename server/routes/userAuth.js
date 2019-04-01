import express from 'express';
import signUp from '../controller/userController';
import signUpValidate from '../middleware/userAuthValidation';
const userRouter = express.Router();


 userRouter.post('/auth/signup', signUpValidate, signUp);

 

 export default userRouter;