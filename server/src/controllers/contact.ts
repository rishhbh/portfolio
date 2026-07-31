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
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    New message from ${safeName} — via portfolio contact form
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a; padding:48px 24px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#0a0a0a; border:1px solid #ffffff;">

          <tr>
            <td style="padding:20px 32px; border-bottom:1px solid #ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:2px; color:#ffffff; text-transform:uppercase;">
                    ● NEW SUBMISSION
                  </td>
                  <td align="right" style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:1px; color:#888888;">
                    ${date}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 32px 32px 32px;">
              <div style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:2px; color:#888888; text-transform:uppercase; margin-bottom:12px;">
                Contact Form / Portfolio
              </div>
              <div style="font-size:28px; line-height:1.25; color:#ffffff; font-weight:700; letter-spacing:-0.5px;">
                ${safeName} sent you a message.
              </div>
            </td>
          </tr>

          <tr><td style="border-top:1px solid #333333;"></td></tr>

          <tr>
            <td style="padding:24px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="120" valign="top" style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:1.5px; color:#888888; text-transform:uppercase; padding-bottom:20px;">
                    From
                  </td>
                  <td valign="top" style="font-size:15px; color:#ffffff; padding-bottom:20px; font-weight:500;">
                    ${safeName}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="120" valign="top" style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:1.5px; color:#888888; text-transform:uppercase; padding-bottom:24px;">
                    Email
                  </td>
                  <td valign="top" style="padding-bottom:24px;">
                    <a href="mailto:${safeEmail}" style="font-size:15px; color:#ffffff; text-decoration:underline; text-underline-offset:3px;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="border-top:1px solid #333333;"></td></tr>

          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <div style="font-family:'Courier New',monospace; font-size:11px; letter-spacing:1.5px; color:#888888; text-transform:uppercase; margin-bottom:14px;">
                Message
              </div>
              <div style="font-size:15px; line-height:1.7; color:#e5e5e5; border-left:2px solid #ffffff; padding-left:16px;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 32px 40px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#ffffff;">
                    <a href="mailto:${safeEmail}" style="display:inline-block; padding:14px 28px; font-family:'Courier New',monospace; font-size:12px; letter-spacing:1.5px; color:#0a0a0a; text-decoration:none; text-transform:uppercase; font-weight:700;">
                      Reply to ${safeName} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px; border-top:1px solid #ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:'Courier New',monospace; font-size:10px; letter-spacing:1.5px; color:#666666; text-transform:uppercase;">
                    Sent from rishabhh.is-a.dev
                  </td>
                  <td align="right" style="font-family:'Courier New',monospace; font-size:10px; letter-spacing:1.5px; color:#666666; text-transform:uppercase;">
                    ○ Automated
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
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update this when you have a verified domain on Resend
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