import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import {
  botTrapReason,
  clientIp,
  containsUrl,
  escapeHtml,
  isRateLimited,
  isValidEmail,
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
      console.warn(`AI-LABs apply: dropped submission (${trap})`);
      return NextResponse.json({ message: "Application sent successfully" }, { status: 200 });
    }

    if (isRateLimited("ai-labs-apply", clientIp(request))) {
      return NextResponse.json({ message: "Too many requests. Please try again later or email info@xrnord.com." }, { status: 429 });
    }

    const rawName = str(body.name);
    const rawCompany = str(body.company);
    const rawTitle = str(body.title);
    const rawEmail = str(body.email);
    const rawPhone = str(body.phone);

    if (!rawName || !rawEmail || !rawCompany) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const tooLong = tooLongField({
      name: [rawName, 100],
      company: [rawCompany, 200],
      title: [rawTitle, 150],
      phone: [rawPhone, 40],
    });
    if (tooLong) {
      return NextResponse.json({ message: `The ${tooLong} field is too long.` }, { status: 400 });
    }

    if (containsUrl(rawName)) {
      return NextResponse.json({ message: "Please enter your name without links." }, { status: 400 });
    }

    const name = escapeHtml(rawName);
    const company = escapeHtml(rawCompany);
    const title = escapeHtml(rawTitle);
    const email = escapeHtml(rawEmail);
    const phone = escapeHtml(rawPhone);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@xrnord.com",
      to: "SW@xrnord.com",
      subject: `AI-LABs Application: ${oneLine(rawName)} - ${oneLine(rawCompany)}`,
      replyTo: rawEmail,
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px; border-bottom: 2px solid #A855F7; padding-bottom: 10px;">New AI-LABs Application</h2>
              <div style="margin-bottom: 16px;"><p style="margin:0;color:#6B7280;font-size:13px;">Company</p><p style="margin:4px 0 0;color:#111827;font-size:16px;font-weight:600;">${company}</p></div>
              <div style="margin-bottom: 16px;"><p style="margin:0;color:#6B7280;font-size:13px;">Name</p><p style="margin:4px 0 0;color:#111827;font-size:16px;">${name}</p></div>
              ${title ? `<div style="margin-bottom: 16px;"><p style="margin:0;color:#6B7280;font-size:13px;">Title</p><p style="margin:4px 0 0;color:#111827;font-size:16px;">${title}</p></div>` : ""}
              <div style="margin-bottom: 16px;"><p style="margin:0;color:#6B7280;font-size:13px;">Email</p><p style="margin:4px 0 0;font-size:16px;"><a href="mailto:${email}" style="color:#A855F7;text-decoration:none;">${email}</a></p></div>
              ${phone ? `<div style="margin-bottom: 16px;"><p style="margin:0;color:#6B7280;font-size:13px;">Phone</p><p style="margin:4px 0 0;font-size:16px;"><a href="tel:${phone}" style="color:#A855F7;text-decoration:none;">${phone}</a></p></div>` : ""}
              <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;">
              <p style="color:#9CA3AF;font-size:12px;margin:0;">AI-LABs application - xrNORD website</p>
            </div>
          </body>
        </html>
      `,
    });

    // Confirmation email to the sender, only after all checks above have passed
    await transporter.sendMail({
      from: `"xrNORD" <${process.env.SMTP_USER || "sw@xrnord.com"}>`,
      replyTo: "info@xrnord.com",
      to: rawEmail,
      subject: "Your AI-LABs application - xrNORD",
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px;">Thank you, ${name}</h2>
              <p style="color:#6B7280;line-height:1.6;margin-bottom:16px;">We have received your application for AI-LABs and will be in touch shortly.</p>
              <p style="color:#6B7280;line-height:1.6;margin-bottom:16px;">AI-LABs is a confidential forum - we review each application carefully before reaching out.</p>
              <p style="color:#6B7280;line-height:1.6;margin-bottom:24px;">Best regards,<br><strong>Stefan Werge</strong><br>CEO, xrNORD</p>
              <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;">
              <p style="color:#9CA3AF;font-size:13px;margin:0;">xrNORD | AI-LABs</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ message: "Application sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("AI-LABs apply error:", error);
    return NextResponse.json({ message: "Failed to send application. Please try again." }, { status: 500 });
  }
}
