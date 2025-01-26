export const otpTemplate = (otp: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          font-size: 24px;
          color: #333333;
          margin-bottom: 20px;
        }
        .otp {
          font-size: 32px;
          font-weight: bold;
          color: #4caf50;
          text-align: center;
          margin: 20px 0;
        }
        .message {
          font-size: 16px;
          color: #555555;
          text-align: center;
          margin-bottom: 20px;
        }
        .footer {
          font-size: 12px;
          color: #888888;
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Your OTP Code</div>
        <div class="message">Use the OTP below to complete verify your email. This code is valid for the next 5 minutes.</div>
        <div class="otp">${otp}</div>
        <div class="message">If you didn’t request this, please ignore this email.</div>
        <div class="footer">© ${new Date().getFullYear()} Your Company Name. All rights reserved.</div>
      </div>
    </body>
    </html>
  `
}