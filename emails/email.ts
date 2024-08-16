import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "noman567n@gmail.com",
      pass: "nsavyaoiifvffntv",
    },
  });
  
  export async function sendEmail(email: string, link: string) {
    const info = await transporter.sendMail({
      from: '"Streamly" <no-reply@streamly.com>',
      to: email,
      subject: "Complete Your Verification",
      text: "Click on the link below to verify your account.",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #121212; border-radius: 8px; color: #ccc;">
          <h2 style="text-align: center; color: #00b3ff; font-family: 'Orbitron', sans-serif;">Verify Your Account</h2>
          <p style="text-align: center; font-size: 16px;">
            Welcome to Streamly! Please click the button below to confirm your email address.
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" style="display: inline-block; padding: 12px 30px; font-size: 16px; color: #121212; background-color: #00b3ff; text-decoration: none; border-radius: 5px; box-shadow: 0 0 10px #00b3ff; font-family: 'Orbitron', sans-serif;">
              Verify Email
            </a>
          </div>
          <p style="text-align: center; font-size: 14px;">
            If the button doesn't work, you can use the following link:
          </p>
          <p style="text-align: center; word-wrap: break-word;">
            <a href="${link}" style="color: #00b3ff; text-decoration: underline;">${link}</a>
          </p>
          <p style="text-align: center; font-size: 12px; margin-top: 20px; color: #777;">
            If you didn’t request this email, please ignore it.
          </p>
        </div>
      `,
    });
  }
  