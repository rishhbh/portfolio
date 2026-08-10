import { Request, Response } from 'express';
import { Resend } from 'resend';

// Prevents user-submitted text from breaking out into HTML (basic XSS guard).
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildContactEmailHtml = (name: string, email: string, message: string) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const date = new Date()
    .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    .toUpperCase();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Contact Form Submission</title>
</head>
<body style="margin:0; padding:0; background-color:#f8f8f5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#000000;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    New message from ${safeName} — via portfolio contact form
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f8f5; padding:40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; background-color:#ffffff; border:3px solid #000000;">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#FFEB3B; border-bottom:3px solid #000000; padding:24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:24px; font-weight:900; color:#000000; text-transform:uppercase; letter-spacing:-0.5px;">
                    NEW SUBMISSION
                  </td>
                  <td align="right">
                    <span style="font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; color:#000000; border:2px solid #000000; background-color:#ffffff; padding:4px 8px; display:inline-block;">
                      ${date}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:32px 32px 24px 32px;">
              <div style="font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; color:#FF5252; text-transform:uppercase; margin-bottom:8px;">
                // SYSTEM DISPATCH
              </div>
              <div style="font-size:20px; font-weight:800; color:#000000; line-height:1.4;">
                ${safeName} initiated contact via portfolio.
              </div>
            </td>
          </tr>

          <!-- Details Grid -->
          <tr>
            <td style="padding:0 32px 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid #000000; background-color:#eef0ea;">
                <tr>
                  <td width="100" style="padding:12px 16px; border-right:2px solid #000000; border-bottom:2px solid #000000; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; text-transform:uppercase; color:#000000;">
                    SENDER
                  </td>
                  <td style="padding:12px 16px; border-bottom:2px solid #000000; font-size:14px; font-weight:700; color:#000000;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td width="100" style="padding:12px 16px; border-right:2px solid #000000; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; text-transform:uppercase; color:#000000;">
                    EMAIL
                  </td>
                  <td style="padding:12px 16px; font-size:14px; font-weight:700;">
                    <a href="mailto:${safeEmail}" style="color:#2196F3; text-decoration:none; font-weight:900;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 32px 32px 32px;">
              <div style="font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; color:#000000; text-transform:uppercase; margin-bottom:12px;">
                MESSAGE PAYLOAD:
              </div>
              <div style="font-size:15px; line-height:1.6; color:#000000; background-color:#ffffff; border:2px solid #000000; padding:20px;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Action -->
          <tr>
            <td style="padding:0 32px 40px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#FF5252; border:2px solid #000000;">
                    <a href="mailto:${safeEmail}" style="display:inline-block; padding:16px 24px; font-size:14px; font-weight:900; color:#ffffff; text-decoration:none; text-transform:uppercase; letter-spacing:1px;">
                      REPLY TO ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#000000; padding:16px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; color:#ffffff; text-transform:uppercase;">
                    RISHABHH.IS-A.DEV
                  </td>
                  <td align="right" style="font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; color:#FFEB3B; text-transform:uppercase;">
                    ● AUTOMATED DISPATCH
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'rishabh223300@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: buildContactEmailHtml(name, email, message),
    });

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};