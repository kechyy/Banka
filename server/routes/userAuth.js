import express from 'express';
import {
  signUp, signIn, createUserAccount, viewAccountHistory
// eslint-disable-next-line import/named
} from '../controller/userController';
import { userCheck } from '../middleware/checkers';
import { tokenVerifier } from '../middleware/authorize';
import {
  signUpValidate, signInValidate, accountValidate,
  viewAccountHistoryValidate
} from '../middleware/userAuthValidation';

const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidate, signUp);
userRouter.post('/auth/signin', signInValidate, signIn);
userRouter.post('/account', accountValidate, tokenVerifier, userCheck, createUserAccount);
userRouter.get('/accounts/:accountNumber/:transactions', viewAccountHistoryValidate, tokenVerifier, userCheck, viewAccountHistory);

export default userRouter;
