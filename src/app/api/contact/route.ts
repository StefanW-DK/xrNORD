import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email to xrNORD
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@xrnord.com",
      to: "SW@xrnord.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px; border-bottom: 2px solid #22D3EE; padding-bottom: 10px;">New Contact Form Submission</h2>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Name:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;">${name}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Email:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;"><a href="mailto:${email}" style="color: #22D3EE; text-decoration: none;">${email}</a></p>
              </div>

              ${phone ? `
              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Phone:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;"><a href="tel:${phone}" style="color: #22D3EE; text-decoration: none;">${phone}</a></p>
              </div>
              ` : ""}

              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Subject:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;">${subject}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Message:</strong></p>
                <div style="margin: 5px 0 15px 0; color: #111827; font-size: 16px; background-color: #f9fafb; padding: 15px; border-left: 4px solid #22D3EE; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word;">
                  ${message}
                </div>
              </div>

              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                This email was sent from the xrNORD website contact form.
              </p>
            </div>
          </body>
        </html>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to user
    const confirmationEmail = {
      from: `"xrNORD" <${process.env.SMTP_USER || "sw@xrnord.com"}>`,
      replyTo: "info@xrnord.com",
      to: email,
      subject: "We received your message - xrNORD",
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px;">Thank you for reaching out!</h2>

              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
                Hi ${name},
              </p>

              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
                We've received your message and will get back to you as soon as possible.
              </p>

              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
                If you have any urgent matters, feel free to call us at <a href="tel:+4523654283" style="color: #22D3EE; text-decoration: none;">+45 23 65 42 83</a> or email us at <a href="mailto:info@xrnord.com" style="color: #22D3EE; text-decoration: none;">info@xrnord.com</a>.
              </p>

              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
                Best regards,<br>
                <strong>The xrNORD Team</strong>
              </p>

              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">

              <p style="color: #9CA3AF; font-size: 14px; margin: 0;">
                xrNORD | Bringing AI into your business
              </p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(confirmationEmail);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
