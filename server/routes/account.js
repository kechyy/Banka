import express from 'express';
import {
  CreateAccount, updateAccount, deleteAccount, viewAccountHistory
} from '../controller/accountController';
import {
  accountValidate, accountUpdateValidate, accountDeleteValidate, viewAccountHistoryValidate
} from '../middleware/accountValidation';
import { tokenVerifier } from '../middleware/authorize';
import { userCheck } from '../middleware/checkers';

const accountRouter = express.Router();

accountRouter.post('/account', accountValidate, tokenVerifier, userCheck, CreateAccount);
accountRouter.patch('/account/:accountNumber', accountUpdateValidate, tokenVerifier, userCheck, updateAccount);
accountRouter.delete('/accounts/:accountNumber', accountDeleteValidate, tokenVerifier, userCheck, deleteAccount);
accountRouter.get('/accounts/:accountNumber/:transactions', viewAccountHistoryValidate, userCheck, viewAccountHistory);
export default accountRouter;
