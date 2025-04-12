import adminModel from '../model/adminModel.js';
import userModel from '../model/userModel.js';
import kycModel from '../model/kycModel.js';
import jwt from 'jsonwebtoken';


const adminLogin =async (req, res) => { 
    console.log("req.body", req.body);
    const { email, password } = req.body;
    if(!email || !password){
            return res.status(400).json({ message: 'Please provide email and password' });
    }
    const adminCheck =await adminModel.findOne({
        email: email,
        password: password,
    });
    if (!adminCheck) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    else {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1m' });
        res.cookie('token', token, { httpOnly: true, secure: true });   
    }
    return res.status(200).json({ message: 'Login successful' });
}
const adminDashboard = async (req, res) => {
    console.log("req.cookies", req.cookies);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    })
    const userData = await kycModel.find({});
    if (userData.length === 0) {
        return res.status(200).json({ message: 'No users found' });
    }
    else
    {
        return res.status(200).json({ message: 'Login successful', userData });
    }
}

const adminApprove = async (req, res) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const checktoken=jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    })

    console.log("checktoken", checktoken);

    const { id, status, email } = req.body;
    console.log("req.body", req.body);
    let statusCheck = "pending";
    if (!id || !status || !email) {
        return res.status(400).json({ message: 'Please provide id' });
    }
    if (status == "true") {
        statusCheck = "approved"
    }
    else if (status == "false") {
        statusCheck = "rejected"
    }
    const userData = await kycModel.findByIdAndUpdate(id, { status: statusCheck });
    if (!userData) {
        return res.status(404).json({ message: 'User not found' });
    }
    else {
        return res.status(200).json({ message: 'User status update successfully' });
    }
}

export { adminLogin,adminDashboard, adminApprove };