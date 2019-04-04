import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import userRoutes from './server/routes/userAuth';
import accountRoutes from './server/routes/account';
import transactionsRouter from './server/routes/transactions';
import dotenv from 'dotenv';
dotenv.config();

// const port = process.env.PORT || 5000;
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1',userRoutes);
app.use('/api/v1',accountRoutes);
app.use('/api/v1',transactionsRouter);  

app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
})