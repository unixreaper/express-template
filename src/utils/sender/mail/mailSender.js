// src/utils/sender/mail/mailSender.js

const nodemailer = require('nodemailer');
const parseHtml = require('../helpers/htmlParser'); // Adjust path as needed
const config = require('../../../config/config.json'); // Adjust the path as needed

class MailSender {
  constructor(env = 'development') {
    const smtpConfig = config[env]?.mailserver?.smtp; // Load SMTP settings from config

    if (!smtpConfig) {
      throw new Error(`SMTP configuration not found for environment: ${env}`);
    }

    this.transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure, // Use SSL or not
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    this.defaultSender = `"${smtpConfig.sender}" <${smtpConfig.user}>`; // Default "from" address
    this.smtpSender = smtpConfig.sender; // Save sender name for use in email body
  }

  /**
   * Send an email
   * @param {string} to - Recipient's email address
   * @param {string} subject - Email subject
   * @param {string} message - Plain text message
   * @param {string} html - HTML content for the email (optional)
   * @param {string} from - Custom "from" address (optional)
   */
  async sendMail(to, subject, message = '', html = '', from = null) {
    const mailOptions = {
      from: from || this.defaultSender, // Use custom "from" if provided, otherwise default
      to,                              // Recipient's address
      subject,                         // Subject line
      text: message,                   // Plain text body
      html: html || undefined,         // HTML body (if provided)
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  /**
   * Send an OTP email.
   * @param {string} recipientEmail - Recipient's email address.
   * @param {string} otp - The OTP code to include in the email.
   * @param {string} refcode - The reference code to include in the email.
   * @returns {Promise<void>} - Resolves when the email is sent.
   */
  async sendMailOTP(recipientEmail, otp, refcode) {
    try {
      // Fetch icon from config
      const icon = config[process.env.NODE_ENV || 'development']?.mailserver?.icon || '';

      // Variables to replace in the template
      const variables = {
        icon, // Use the default icon from config
        title: 'รหัส OTP ของคุณ',
        message: 'กรุณาใช้รหัส OTP ด้านล่างเพื่อดำเนินการต่อ:',
        sender: `ทีมงาน ${this.smtpSender}`, // Use the sender from the config
        otp, // Use the provided OTP
        refcode, // Use the provided reference code
      };

      // Parse the HTML template
      const htmlContent = parseHtml('./html/email_otp.html', variables);

      // Send the email
      const result = await this.sendMail(
        recipientEmail, // Recipient's email
        'รหัส OTP ของคุณ', // Email subject
        null, // Plain text (optional)
        htmlContent // Parsed HTML content
      );

      console.log('Email sent successfully:', result);
    //   console.log('smtpSender :', this.smtpSender);
    } catch (error) {
      console.error('Failed to send OTP email:', error.message);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}

module.exports = MailSender;
