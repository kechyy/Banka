import express from 'express';
import { signUp, signIn } from '../controller/userController';
import { signUpValidate, signInValidate } from '../middleware/userAuthValidation';

const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidate, signUp);
userRouter.post('/auth/signin', signInValidate, signIn);

export default userRouter;
