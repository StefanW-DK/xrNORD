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
    const { name, email, phone, company, preferredDate } = await request.json();

    if (!name || !email || !company) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@xrnord.com",
      to: "SW@xrnord.com",
      subject: `New Workshop Booking Request: ${name}`,
      replyTo: email,
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px; border-bottom: 2px solid #C026D3; padding-bottom: 10px;">New AI Workshop Booking Request</h2>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Name:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;">${name}</p>
              </div>

              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Email:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;"><a href="mailto:${email}" style="color: #C026D3; text-decoration: none;">${email}</a></p>
              </div>

              ${phone ? `
              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Phone:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;"><a href="tel:${phone}" style="color: #C026D3; text-decoration: none;">${phone}</a></p>
              </div>
              ` : ""}

              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>About the Company:</strong></p>
                <div style="margin: 5px 0 15px 0; color: #111827; font-size: 16px; background-color: #f9fafb; padding: 15px; border-left: 4px solid #C026D3; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word;">
                  ${company}
                </div>
              </div>

              ${preferredDate ? `
              <div style="margin-bottom: 20px;">
                <p style="margin: 0; color: #6B7280;"><strong>Preferred Workshop Date:</strong></p>
                <p style="margin: 5px 0 15px 0; color: #111827; font-size: 16px;">${preferredDate}</p>
              </div>
              ` : ""}

              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                This request was submitted via the xrNORD website booking form.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    await transporter.sendMail({
      from: `"xrNORD" <${process.env.SMTP_USER || "sw@xrnord.com"}>`,
      replyTo: "info@xrnord.com",
      to: email,
      subject: "Your AI Workshop Request - xrNORD",
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px;">Your Workshop Request is Received!</h2>
              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">Hi ${name},</p>
              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest in our AI Workshop. We've received your request and will be in touch shortly to confirm the details and your preferred date.
              </p>
              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
                In the meantime, feel free to reach us at <a href="tel:+4523654283" style="color: #C026D3; text-decoration: none;">+45 23 65 42 83</a> or <a href="mailto:info@xrnord.com" style="color: #C026D3; text-decoration: none;">info@xrnord.com</a>.
              </p>
              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
                Best regards,<br><strong>The xrNORD Team</strong>
              </p>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
              <p style="color: #9CA3AF; font-size: 14px; margin: 0;">xrNORD | Bringing AI into your business</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ message: "Request sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Workshop booking error:", error);
    return NextResponse.json({ message: "Failed to send request. Please try again later." }, { status: 500 });
  }
}
