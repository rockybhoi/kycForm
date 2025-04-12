import { DBNAME } from '../constant.js';
import mongoose from 'mongoose';


const connectDB = async () => { 
    try {
        const connectDBConfig = await mongoose.connect(`${process.env.MONGODB_URI}${DBNAME}`);        
    } catch (error) {
        console.log("error", error);
        process.exit(1);
    }
}

export default connectDB;