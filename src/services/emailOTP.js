// utils/emailOTP.js

const nodemailer = require('nodemailer');

// Create a transporter using nodemailer with Hostinger SMTP settings
const transporter = nodemailer.createTransport({
	host: 'smtp.hostinger.com', // Hostinger SMTP server
	port: 465, // Typically 587 for STARTTLS or 465 for SSL
	secure: true, // Use true for 465, false for other ports
	auth: {
		user: 'your-email@domain.com',
		pass: 'your-email-password',
	},
});

// Function to send OTP email
const sendOTPEmail = async (toEmail, otp, refCode) => {
	// HTML content for the email
	const htmlContent = `
	<!doctype html>
	<html lang="en">
	<head>
	  <meta charset="utf-8" />
	  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
	  <title>OTP</title>
  
	  <!-- Bootstrap CSS CDN -->
	  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gTGE1cJkaMwUuHJZgW7jBUyT5Ays0uRUgZMNq2i5u1xSbOe4rsYoBXmoAkQpD3Vx" crossorigin="anonymous">
  
	  <!-- Fallback styles in case Bootstrap is not supported -->
	  <style>
		.container {
		  max-width: 600px; 
		  margin: 20px auto; 
		  padding: 20px; 
		  background-color: #ffffff; 
		  border-radius: 8px; 
		  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
		.text-center { text-align: center; }
		.otp-code { background-color: #f0f0f0; padding: 10px; display: inline-block; color: #333; }
		.text-muted { color: #999; }
	  </style>
	</head>
	<body style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; background-color: #f8f9fa; margin: 0; padding: 0;">
	  <div class="container">
		<!-- Logo -->
		<div class="text-center mb-4">
		  <img src="${logoBase64}" alt="Logo" style="width: 100px; height: auto;" />
		</div>
		<center>
		  <h4 class="text-center">Your OTP Code 💬</h4>
		</center>
		<p class="text-center">Use the following OTP code to complete your action</p>
		<h1 class="otp-code">${otp}</h1>
		<p class="text-center">Please enter this code to proceed. This OTP is valid for a limited time.</p>
		<hr />
		<p class="text-center"><strong>Reference Code:</strong> ${refCode}</p>
		<p class="text-center text-muted">If you didn't request this, please ignore this email.</p>
	  </div>
	</body>
	</html>
  `;

	// Email options
	const mailOptions = {
		from: 'your-email@domain.com', // Sender address (your Hostinger email)
		to: toEmail, // Recipient address
		subject: 'Your OTP Code and Reference Code', // Subject of the email
		html: htmlContent, // HTML body content
	};

	// Send the email
	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent: ' + info.response);
		return info.response; // Return the response from the email server
	} catch (error) {
		console.error('Error sending email:', error);
		throw new Error('Failed to send OTP email'); // Throw an error if sending fails
	}
};

// Export the function to use in other files
module.exports = sendOTPEmail;

