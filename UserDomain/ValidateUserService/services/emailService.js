require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');

const email_code_reset = async (code, email) => {
    try {
        // Configuring mail transport
        let transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS   
            }
        });

        // Configure email content
        let mailOptions = {
            from: `"Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password recovery code",
            text: `Your recovery code is: ${code}`,
            html: `<p>Your recovery code is: <strong>${code}</strong></p>`
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${email}: ${info.messageId}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = { email_code_reset };
