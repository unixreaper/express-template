const MailSender = require('../utils/sender/mail/mailSender');

(async () => {
  try {
    // Initialize MailSender with the current environment
    const mailSender = new MailSender(process.env.NODE_ENV || 'development');

    // Parameters to pass
    const recipientEmail = 'siaminnovator@gmail.com';
    const otp = '123456';
    const refcode = 'REF20231122';

    // Send the OTP email
    await mailSender.sendMailOTP(recipientEmail, otp, refcode);
    console.log('OTP email sent successfully!');
  } catch (error) {
    console.error('Error sending OTP email:', error.message);
  }
})();
