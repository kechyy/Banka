import express from 'express';
import debitCredit from '../controller/transactionsController';
import debitCreditValidate from '../middleware/transactionsValidation';
const transactionsRouter = express.Router();

transactionsRouter.post('/transactions/:accountNumber/:type', debitCreditValidate, debitCredit);
export default transactionsRouter;