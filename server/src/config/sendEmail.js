// src/utils/sendEmail.js
const nodemailer = require('nodemailer');

/**
 * Creates a professional HTML email template.
 * It intelligently finds a 5-digit code in the message and styles it.
 */
const getEmailHtml = (options) => {
  const { subject, message } = options;

  let messagePart1 = '';
  let codeBlock = '';
  let messagePart2 = '';

  // Try to find a 5-digit code (like the one from your authController)
  const codeMatch = message.match(/\b(\d{5})\b/);
  
  if (codeMatch) {
    const code = codeMatch[1];
    const matchIndex = codeMatch.index;
    
    // Get text before and after the code
    messagePart1 = message.substring(0, matchIndex).replace(/\n/g, '<br />');
    messagePart2 = message.substring(matchIndex + 5).replace(/\n/g, '<br />');

    // Create a styled block for the code
    codeBlock = `
      <div style="font-size: 28px; font-weight: 700; color: #1a202c; background-color: #f7fafc; padding: 15px 20px; border-radius: 8px; text-align: center; margin: 20px 0; letter-spacing: 2px; border: 1px dashed #cbd5e0;">
        ${code}
      </div>
    `;
  } else {
    // If no code is found, just format the whole message with line breaks
    messagePart1 = message.replace(/\n/g, '<br />');
  }

  // --- Start of HTML Email Template ---
  // This uses inline CSS and tables for maximum email client compatibility.
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f7;">
      
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 20px 0;">
            
            <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 90%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
              
              <tr>
                <td style="padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #1a202c;">
                    TREASURED 
                    <span style="font-weight: 600; color: #D97706;">FRAGRANCES</span>
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 30px 40px;">
                  <h2 style="font-size: 20px; font-weight: 600; color: #1a202c; margin-top: 0;">${subject}</h2>
                  
                  <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
                    ${messagePart1}
                  </p>
                  
                  ${codeBlock}
                  
                  <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
                    ${messagePart2}
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 12px; color: #718096;">
                    &copy; ${new Date().getFullYear()} Treasured Fragrances. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
  // --- End of HTML Email Template ---
};


const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: false, // true for 465, false for other ports like 587
    tls: {
      ciphers: 'SSLv3',
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Treasured Fragrances <${process.env.EMAIL_USER}>`, // Professional "From" field
    to: options.email,
    subject: options.subject,
    text: options.message, // Fallback for email clients that don't support HTML
    html: getEmailHtml(options), // The new professional HTML content
  };

  // 3. Actually send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;