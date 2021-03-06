import express from 'express';
import { updateUserController, usersController, adminSignUpController } from '../controller/adminController';
import { adminSignUpValidate, updateUserValidation } from '../middleware/adminValidation';
import { tokenVerifier } from '../middleware/authorize';
import { adminCheck } from '../middleware/checkers';

const adminRouter = express.Router();

adminRouter.post('/auth/createUser', adminSignUpValidate, tokenVerifier, adminCheck, adminSignUpController);
adminRouter.post('/setuser/:userid', updateUserValidation, tokenVerifier, adminCheck, updateUserController);
adminRouter.get('/users', tokenVerifier, adminCheck, usersController);
// adminRouter.get('/accounts/:accountNumber/:transactions', tokenVerifier,adminCheck, viewAccountHistoryValidate, viewAccountHistory);
export default adminRouter;
