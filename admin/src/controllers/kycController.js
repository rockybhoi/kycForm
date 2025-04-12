import kycModel from "../model/kycModel.js";
import { sendMail } from "../utils/sendMailUtils.js";

const kycRegister = async (req, res) => { 
    const { name, email, phone, address, city, state, country, pincode, aadhar, pan, dob, gender } = req.body;
    console.log("req.body", dob);

    // const [day, month, year] = dob.split('/');
    // const dobdate = new Date(`${year}-${month}-${day}`);
    // console.log("dobdate", dobdate);

    const profile = req.file.filename;

    if(!name || !email || !phone || !address || !city || !state || !country || !pincode || !aadhar || !pan || !dob || !gender || !profile) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    if(!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Please enter a valid email' });
    }
    if(phone.length < 10) {
        return res.status(400).json({ message: 'Phone number must be at least 10 characters' });
    }
    if(pincode.length < 6) {
        return res.status(400).json({ message: 'Pincode must be at least 6 characters' });
    }
    if(aadhar.length < 12) {
        return res.status(400).json({ message: 'Adhar number must be at least 12 characters' });
    }
    if(pan.length < 10) {
        return res.status(400).json({ message: 'Pan number must be at least 10 characters' });
    }
    
    try {
        const registerKycData =await     kycModel.create({
            name,
            email,
            phone,
            address,
            city,
            state,
            country,
            pincode,
            aadhar,
            pan,
            dob,
            gender,
            profile
        })

     

            if (registerKycData) {
            
                  // Send email after successful registration
            try {
               const email_send= await sendMail(
                    email,
                    'KYC Registration Successful',
                    `<p>Dear ${name},</p><p>Your KYC registration has been successfully completed.</p>`
                );
                if(email_send) {
                    console.log("Email sent successfully");
                }

                console.log("Email sent to", email);
            } catch (emailErr) {
                console.error("Failed to send email:", emailErr.message);
            }
          
            return res.status(201).json({ message: 'KYC registered successfully' });
        } else {
            return res.status(400).json({ message: 'KYC registration failed' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const kycRegisterList= async (req, res) => {
    try {
        const kycList = await kycModel.find({});
        return res.status(200).json({ kycList });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const kycRegisterUpdate = async (req, res) => { 
    const { id } = req.params;
    const { email, approve } = req.body;
    console.log(" req.params;",  req.params);
    console.log("req.body", req.body);
    console.log("id", id);
    if(!email) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    if (!approve)
    {
        try {
            const email_send= await sendMail(
                email,
                'KYC Registration Rejected',
                `<p>Dear User,</p><p>Your KYC registration has been Rejected.</p>`
            );
            if(email_send) {
                console.log("Email sent successfully");
            }
        } catch (error) {
            throw new Error("Failed to send email:", error.message);
        }
        return res.status(400).json({ message: 'Your form is rejected' });
    }
    const check = await kycModel.updateOne(
        { _id: id, email: email },
        {$set:{status: approve}}
    )
    if (check) {
        try {
            const email_send= await sendMail(
                email,
                'KYC Registration Approved',
                `<p>Dear User,</p><p>Your KYC registration has been approved.</p>`
            );
            if(email_send) {
                console.log("Email sent successfully");
            }
            return res.status(200).json({ message: 'KYC updated successfully' });
        } catch (emailErr) {
            console.error("Failed to send email:", emailErr.message);
        }
    } else {
        return res.status(400).json({ message: 'KYC update failed' });
    }
}

export { kycRegister, kycRegisterList, kycRegisterUpdate}