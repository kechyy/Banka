import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import userRoutes from './server/routes/userAuth';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/users',userRoutes);  

app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
})