import express from 'express';
import {
  CreateAccount, updateAccount, deleteAccount, viewAccountHistory
} from '../controller/accountController';
import {
  accountValidate, accountUpdateValidate, accountDeleteValidate, viewAccountHistoryValidate
} from '../middleware/accountValidation';
import { tokenVerifier } from '../middleware/authorize';

const accountRouter = express.Router();

accountRouter.post('/account', accountValidate, tokenVerifier, CreateAccount);
accountRouter.patch('/account/:accountNumber', accountUpdateValidate, tokenVerifier, updateAccount);
accountRouter.delete('/accounts/:accountNumber', accountDeleteValidate, tokenVerifier, deleteAccount);
accountRouter.get('/accounts/:accountNumber/:transactions', viewAccountHistoryValidate, viewAccountHistory);
export default accountRouter;
