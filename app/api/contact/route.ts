import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { API_MESSAGES, VALIDATION } from '@/lib/constants';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(VALIDATION.contact.name.min, VALIDATION.contact.name.message),
  // eslint-disable-next-line deprecation/deprecation
  email: z.string().email(),
  message: z.string().min(VALIDATION.contact.message.min, VALIDATION.contact.message.message),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = contactSchema.parse(body);
    const { name, email, message } = validatedData;

    // Configure nodemailer transporter
    // Note: You'll need to set up environment variables for email credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number.parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Contact: ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 20px;">
          <h2 style="color: #10b981;">New Contact Form Submission</h2>
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; color: #e2e8f0;">
            <p><strong style="color: #10b981;">Name:</strong> ${name}</p>
            <p><strong style="color: #10b981;">Email:</strong> ${email}</p>
            <hr style="border: 1px solid #334155; margin: 20px 0;">
            <p><strong style="color: #10b981;">Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: API_MESSAGES.contact.success },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: API_MESSAGES.contact.validation, details: error.issues },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: API_MESSAGES.contact.error },
      { status: 500 }
    );
  }
}
