import nodemailer from 'nodemailer';
import {
  AWS_MAIL_HOST,
  AWS_SENDER_MAIL,
  AWS_SMTP_PASSWORD,
  AWS_SMTP_USERNAME,
} from '../constant/constant';

const sendEmail = (req, res) => {
  const RECIPIENT_EMAIL_ADDRESS = 'biplopk@gmail.com';
  // Create a Nodemailer transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: AWS_MAIL_HOST,
    port: 587,
    secure: true, // use SSL
    auth: {
      user: AWS_SMTP_USERNAME,
      pass: AWS_SMTP_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: AWS_SENDER_MAIL,
    to: RECIPIENT_EMAIL_ADDRESS,
    subject: 'Test email from Node.js',
    text: 'This is a test email sent from Node.js using Amazon SES.',
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent successfully:', info.response);
      res.send('Email sent successfully');
    }
  });
};

export default sendEmail;
