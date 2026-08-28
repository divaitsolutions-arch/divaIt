import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message, inquiryType, company, budget, projectDescription, bot_field } = data;

    // Honeypot check for bots
    if (bot_field) {
      console.log("Honeypot triggered, dropping submission.");
      return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    }

    // We can handle both GlobalContactPage and AgencyContactForm
    const isAgency = !!budget || !!projectDescription;
    const typeLabel = isAgency ? "Service Inquiry" : (inquiryType === 'learning' ? 'Training Inquiry' : 'Service Inquiry');

    // Build the email text
    let text = `New ${typeLabel} received from the website.\n\n`;
    text += `Name: ${name}\n`;
    text += `Email: ${email}\n`;
    if (phone) text += `Phone: ${phone}\n`;
    if (company) text += `Company: ${company}\n`;
    if (budget) text += `Budget: ${budget}\n\n`;
    text += `Message / Project Details:\n${message || projectDescription}\n`;

    const escapeHtml = (unsafe: any) => {
      return (unsafe || '').toString().replace(/[&<"'>]/g, (m: string) => {
        switch (m) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&#039;';
          default: return m;
        }
      });
    };

    let html = `<h2>New ${escapeHtml(typeLabel)}</h2>`;
    html += `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`;
    html += `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`;
    if (phone) html += `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`;
    if (company) html += `<p><strong>Company:</strong> ${escapeHtml(company)}</p>`;
    if (budget) html += `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>`;
    html += `<p><strong>Message:</strong><br/>${escapeHtml(message || projectDescription).replace(/\n/g, '<br/>')}</p>`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.divaitsolutions.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'contact@divaitsolutions.com',
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000, // 10 seconds timeout
      tls: {
        rejectUnauthorized: true
      }
    });

    const mailOptions = {
      from: `"Diva IT Website" <${process.env.SMTP_USER || 'contact@divaitsolutions.com'}>`,
      to: 'contact@divaitsolutions.com',
      replyTo: email,
      subject: `New ${typeLabel} from ${name}`,
      text: text,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
