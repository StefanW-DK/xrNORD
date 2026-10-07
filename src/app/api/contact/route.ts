import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import {
  botTrapReason,
  clientIp,
  containsUrl,
  escapeHtml,
  hasNoLetters,
  isRateLimited,
  isValidEmail,
  looksLikeRandomString,
  readBody,
  oneLine,
  str,
  tooLongField,
} from "@/lib/formGuard";

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
    const body = await readBody(request);

    // Bot traps: answer as if it worked, send nothing
    const trap = botTrapReason(body);
    if (trap) {
      console.warn(`Contact form: dropped submission (${trap})`);
      return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    }

    if (isRateLimited("contact", clientIp(request))) {
      return NextResponse.json(
        { message: "Too many messages. Please try again later or email info@xrnord.com." },
        { status: 429 }
      );
    }

    const rawName = str(body.name);
    const rawEmail = str(body.email);
    const rawPhone = str(body.phone);
    const rawSubject = str(body.subject);
    const rawMessage = str(body.message);

    // Validation
    if (!rawName || !rawEmail || !rawSubject || !rawMessage) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const tooLong = tooLongField({
      name: [rawName, 100],
      phone: [rawPhone, 40],
      subject: [rawSubject, 200],
      message: [rawMessage, 10000],
    });
    if (tooLong) {
      return NextResponse.json({ message: `The ${tooLong} field is too long.` }, { status: 400 });
    }

    if (containsUrl(rawName)) {
      return NextResponse.json({ message: "Please enter your name without links." }, { status: 400 });
    }

    // Random-string spam (e.g. subject "KSEsOOoMabhjUcXioolFOw", message "12345").
    // Shown as an error rather than dropped silently, so a real person can rephrase.
    if (looksLikeRandomString(rawSubject) || looksLikeRandomString(rawName) || hasNoLetters(rawMessage)) {
      console.warn("Contact form: rejected random-looking submission");
      return NextResponse.json(
        { message: "Please write a short message describing your inquiry." },
        { status: 400 }
      );
    }

    const name = escapeHtml(rawName);
    const email = escapeHtml(rawEmail);
    const phone = escapeHtml(rawPhone);
    const subject = escapeHtml(rawSubject);
    const message = escapeHtml(rawMessage);

    // Email to xrNORD
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@xrnord.com",
      to: "SW@xrnord.com",
      subject: `New Contact Form Submission: ${oneLine(rawSubject)}`,
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
      replyTo: rawEmail,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Confirmation email to the sender, only after all checks above have passed
    const confirmationEmail = {
      from: `"xrNORD" <${process.env.SMTP_USER || "sw@xrnord.com"}>`,
      replyTo: "info@xrnord.com",
      to: rawEmail,
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
