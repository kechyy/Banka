import express from 'express';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import dotenv from 'dotenv';
import userRoutes from './server/routes/userAuth';
import adminRoutes from './server/routes/admin';
import staffAdminRoutes from './server/routes/staffAdmin';
import cashierRouter from './server/routes/cashier';

const app = express();
dotenv.config();

const port = process.env.PORT || 3200;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/staffadmin', staffAdminRoutes);
app.use('/api/v1/cashier', cashierRouter);

app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found'
}));

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
export default app;
