import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({
  message: `Banka is a light-weight core banking application that powers banking 
    operations like account creation, customer deposit and withdrawals. This app is 
  meant to support a single bank, where users can signup and create bank accounts online`
}));
export default router;
