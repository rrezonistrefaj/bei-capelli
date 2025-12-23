interface ContactFormEmailData {
  name: string;
  email: string;
  message: string;
}

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getSMTPConfig(): SMTPConfig {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS;

  if (!host) {
    throw new Error("SMTP_HOST environment variable is required for SMTP email service");
  }
  if (!user) {
    throw new Error("SMTP_USER environment variable is required for SMTP email service");
  }
  if (!password) {
    throw new Error("SMTP_PASS environment variable is required for SMTP email service");
  }

  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_PORT === '465' || port === 465;

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass: password,
    },
  };
}

export async function sendContactEmail(data: ContactFormEmailData): Promise<void> {
  if (!isValidEmail(data.email)) {
    throw new Error("Invalid email address format");
  }

  const nodemailer = await import("nodemailer");
  const config = getSMTPConfig();
  
  const recipientEmail = process.env.MAIL_TO;
  const fromEmail = process.env.MAIL_FROM || config.auth.user;

  if (!recipientEmail) {
    throw new Error("MAIL_TO environment variable is required");
  }
  if (!isValidEmail(recipientEmail)) {
    throw new Error("Invalid recipient email address in MAIL_TO");
  }
  if (!isValidEmail(fromEmail)) {
    throw new Error("Invalid from email address in MAIL_FROM");
  }

  const transporter = nodemailer.createTransport(config);

  try {
    await transporter.verify();

    await transporter.sendMail({
      from: `"${escapeHtml(data.name)}" <${fromEmail}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `Contact formulier - ${escapeHtml(data.name)}`,
      html: generateEmailHTML(data),
      text: generateEmailText(data),
    });

    transporter.close();
  } catch (error) {
    transporter.close();
    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        throw new Error("SMTP connection refused. Please check SMTP_HOST and SMTP_PORT.");
      }
      if (error.message.includes("EAUTH")) {
        throw new Error("SMTP authentication failed. Please check SMTP_USER and SMTP_PASS.");
      }
      if (error.message.includes("ETIMEDOUT")) {
        throw new Error("SMTP connection timeout. Please check your network connection and SMTP settings.");
      }
      throw new Error(`Failed to send email via SMTP: ${error.message}`);
    }
    throw new Error("Unknown error occurred while sending email via SMTP");
  }
}

function generateEmailHTML(data: ContactFormEmailData): string {
  return `
    <!DOCTYPE html>
    <html lang="nl">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Formulier</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0; font-size: 24px;">Contact Formulier</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #333;">
            <p style="margin: 8px 0;"><strong style="color: #333;">Naam:</strong> <span style="color: #666;">${escapeHtml(data.name)}</span></p>
            <p style="margin: 8px 0;"><strong style="color: #333;">Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #333; text-decoration: none;">${escapeHtml(data.email)}</a></p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #333; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #333; font-size: 18px;">Bericht:</h3>
            <p style="white-space: pre-wrap; color: #666; line-height: 1.8;">${escapeHtml(data.message)}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
            Dit email is verzonden vanuit het contactformulier op beicapelli.com
          </p>
        </div>
      </body>
    </html>
  `;
}

function generateEmailText(data: ContactFormEmailData): string {
  let text = `Contact Formulier\n\n`;
  text += `Naam: ${data.name}\n`;
  text += `Email: ${data.email}\n`;
  text += `\nBericht:\n${data.message}\n\n`;
  text += `---\nDit email is verzonden vanuit het contactformulier op beicapelli.com`;
  return text;
}

function escapeHtml(text: string): string {
  if (typeof text !== "string") {
    return String(text);
  }

  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };
  
  return text.replace(/[&<>"'`=\/]/g, (m) => map[m]);
}

