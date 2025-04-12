import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // or "smtp.yourmail.com"
        auth: {
            user: process.env.SMTP_USER,     // your email
            pass: process.env.SMTP_PASSWORD,     // your email password or app password
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};
