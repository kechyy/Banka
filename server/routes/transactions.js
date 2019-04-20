import express from 'express';
import {debitCredit, transactionHistory } from '../controller/transactionsController';
import { tokenVerifier } from '../middleware/authorize';
import debitCreditValidate from '../middleware/transactionsValidation';
const transactionsRouter = express.Router();

transactionsRouter.get('/transactions/:accountNumber/:id', transactionHistory);
transactionsRouter.post('/transactions/:accountNumber/:type', debitCreditValidate, tokenVerifier, debitCredit);

export default transactionsRouter;
