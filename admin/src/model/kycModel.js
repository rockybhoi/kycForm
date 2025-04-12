import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    profile: {
        type: String,
        required: true,        
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    aadhar: {
        type: String,
        required: true,
        unique: true,
    },
    pan: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    gender:{
        type: String,
        required: true,
    } 
},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    })

    const kycModel = mongoose.model('kyc', kycSchema);
    export default kycModel;