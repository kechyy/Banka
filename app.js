import express from 'express';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import dotenv from 'dotenv';
import userRoutes from './server/routes/userAuth';
import adminRoutes from './server/routes/adminRoutes';
import accountRoutes from './server/routes/account';
import transactionsRouter from './server/routes/transactions';

const app = express();
dotenv.config();

const port = process.env.PORT || 3200;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', accountRoutes);
app.use('/api/v1', transactionsRouter);
app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found'
}));

export default app;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
