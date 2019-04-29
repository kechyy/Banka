import express from 'express';
import { updateUserController } from '../controller/adminController';
import updateUserValidation from '../middleware/adminValidation';
import { tokenVerifier } from '../middleware/authorize';
import { adminCheck } from '../middleware/checkers';
import {
  viewAccountHistoryValidate, signUpValidate
} from '../middleware/userAuthValidation';
import {
  viewAccountHistory, signUp
} from '../controller/userController';

const adminRouter = express.Router();

adminRouter.post('/auth/createUser', tokenVerifier, adminCheck, signUpValidate, signUp);
adminRouter.post('/setuser/:userid', updateUserValidation, tokenVerifier, adminCheck, updateUserController);
adminRouter.get('/accounts/:accountNumber/:transactions', tokenVerifier, adminCheck, viewAccountHistoryValidate, viewAccountHistory);
export default adminRouter;
