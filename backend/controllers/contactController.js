const nodemailer = require('nodemailer');
require('../config');

class ContactController {
    async sendMessage(req, res) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS,
            },
        });
        await transporter.sendMail({
            from: '',
            to: process.env.NODEMAILER_SENDTO,
            subject: `Email od: ${req.body.userEmail}`,
            text: req.body.userMessage,
        });
        return res.status(200).json('Email has been sent');
    }
}

module.exports = new ContactController();
