import express from 'express';
import { debitCredit, viewAllTransactions } from '../controller/cashierController';
// import creditController from '../controller/creditController';
import { tokenVerifier } from '../middleware/authorize';
import { cashierCheck } from '../middleware/checkers';
import debitCreditValidate from '../middleware/cashierValidation';

const cashierRouter = express.Router();

cashierRouter.post('/transactions/:accountNumber/:type', debitCreditValidate, tokenVerifier, cashierCheck, debitCredit);
cashierRouter.get('/allTransactions', tokenVerifier, cashierCheck, viewAllTransactions);


export default cashierRouter;
