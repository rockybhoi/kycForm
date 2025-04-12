import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps: {
        "createdAt": "created_at",
        "updatedAt": "updated_at"
    }
})

const adminModel = mongoose.model('admin', adminSchema);

export default adminModel;