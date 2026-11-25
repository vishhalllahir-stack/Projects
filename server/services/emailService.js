import nodemailer from 'nodemailer';

export function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
    Number.isInteger(Number(process.env.SMTP_PORT)) &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_FROM
  );
}

export async function sendPasswordResetEmail(email, resetUrl) {
  const port = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your Nexora AI password',
    text: `Use this link to reset your Nexora AI password. It expires in 15 minutes: ${resetUrl}`,
    html: `<p>Use this link to reset your Nexora AI password. It expires in 15 minutes.</p><p><a href="${resetUrl}">Reset password</a></p>`
  });
}
