import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';


const userRegister = async (req, res) => { 
    const { name, email, password, phone } = req.body; 
    if(!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    if(!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Please enter a valid email' });
    }
    if(password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if(phone.length < 10) {
        return res.status(400).json({ message: 'Phone number must be at least 10 characters' });
    }
    try {
        const register = await userModel.create({
            name,
            email, 
            password,
            phone
        })
        if(register) {
            return res.status(201).json({ message: 'User registered successfully' });
        } else {
            return res.status(400).json({ message: 'User registration failed' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

const userLogin = async (req, res) => { 
    const { email, password } = req.body;
    if (!email || !password) { 
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    try {
        const check =await userModel.findOne({ email: email, password: password });

        if (!check) { 
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).cookie('usertoken', token, { httpOnly: true }).json({ message: 'Login successful' });
            
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });        
    }
}

export { userRegister, userLogin };