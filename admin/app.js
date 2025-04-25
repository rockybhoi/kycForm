import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/db/config.js';
import userRouter from './src/routes/userRoute.js';
import kycRouter from './src/routes/kycRoute.js';
import adminRouter from './src/routes/adminRoute.js';
import  cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:"*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
))

app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
    res.send('Welcome to the KYC API');
});


app.use('/api/user', userRouter);

app.use('/api/kyc', kycRouter);

app.use('/api/admin',adminRouter);

connectDB()
    .then(() => {
        app.listen(`${process.env.PORT}`, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    });