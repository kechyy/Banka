import express from 'express';
// eslint-disable-next-line import/named
import {
  updateAccount, deleteAccount,
  viewSpecificOwnedAccounts, viewAllBankAccounts,
  viewAllActiveBankAccounts, allBankAccounts
// eslint-disable-next-line import/named
} from '../controller/staffAdminController';
import {
  accountUpdateValidate, accountDeleteValidate, viewSpecificOwnedAccountsValidation,
} from '../middleware/staffAdminValidation';
import { tokenVerifier } from '../middleware/authorize';
import { staffAdminCheck } from '../middleware/checkers';

const staffAdminRoutes = express.Router();
staffAdminRoutes.patch('/account/:accountNumber', accountUpdateValidate, tokenVerifier, staffAdminCheck, updateAccount);
staffAdminRoutes.delete('/accounts/:accountNumber', accountDeleteValidate, tokenVerifier, staffAdminCheck, deleteAccount);
staffAdminRoutes.get('/bankAccounts', tokenVerifier, staffAdminCheck, allBankAccounts);
staffAdminRoutes.get('/user/:email/accounts', viewSpecificOwnedAccountsValidation,
  tokenVerifier, staffAdminCheck, viewSpecificOwnedAccounts);
// staffAdminRoutes.get('/accounts', tokenVerifier, staffAdminCheck, viewAllBankAccounts);
staffAdminRoutes.get('/accounts', tokenVerifier, staffAdminCheck, viewAllActiveBankAccounts);

export default staffAdminRoutes;
