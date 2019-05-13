import express from 'express';
import {
  signUp, signIn, createUserAccount, viewAccountHistory, viewSpecificAccount,
  viewSpecificAccountDetails, userProfile, userAccountList
} from '../controller/userController';
import { userCheck } from '../middleware/checkers';
import { tokenVerifier } from '../middleware/authorize';
import {
  signUpValidate, signInValidate, accountValidate,
  viewAccountHistoryValidate, viewSpecificAcctValidate, viewSpecificAccountDetailsValidation
} from '../middleware/userAuthValidation';

const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidate, signUp);
userRouter.post('/auth/signin', signInValidate, signIn);
userRouter.post('/account', accountValidate, tokenVerifier, userCheck, createUserAccount);
userRouter.get('/profile', tokenVerifier, userCheck, userProfile);
userRouter.get('/userAccounts', tokenVerifier, userCheck, userAccountList);
userRouter.get('/accounts/:accountNumber/transactions', viewAccountHistoryValidate, tokenVerifier, userCheck, viewAccountHistory);
userRouter.get('/transactions/:transactionId', viewSpecificAcctValidate, tokenVerifier, userCheck, viewSpecificAccount);
userRouter.get('/accounts/:accountNumber', viewSpecificAccountDetailsValidation, tokenVerifier, userCheck, viewSpecificAccountDetails);
export default userRouter;
