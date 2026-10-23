import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import {
  botTrapReason,
  clientIp,
  escapeHtml,
  isRateLimited,
  isValidEmail,
  str,
  tooLongField,
  containsUrl,
} from "@/lib/formGuard";

const CONSENT_TEXT =
  "I am happy for xrNORD to contact me about continuous compliance and how it could apply to my organisation. You can unsubscribe at any time.";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const PDF_PATH = "/files/xrNORD-Continuous-Compliance-Executive-Summary.pdf";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const trap = botTrapReason(body);
    if (trap) {
      console.warn(`Executive summary: dropped submission (${trap})`);
      return NextResponse.json({ message: "Request received" }, { status: 200 });
    }

    if (isRateLimited("executive-summary", clientIp(request))) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const rawName = str(body.name);
    const rawEmail = str(body.email);
    const rawJobTitle = str(body.jobTitle);
    const rawConsent = body.consent === true;
    const ip = clientIp(request);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.xrnord.com";
    const pdfUrl = `${siteUrl}${PDF_PATH}`;

    if (!rawName || !rawEmail || !rawJobTitle) {
      return NextResponse.json({ message: "Please fill in all fields." }, { status: 400 });
    }

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const tooLong = tooLongField({
      name: [rawName, 100],
      jobTitle: [rawJobTitle, 150],
    });
    if (tooLong) {
      return NextResponse.json({ message: `The ${tooLong} field is too long.` }, { status: 400 });
    }

    if (containsUrl(rawName) || containsUrl(rawJobTitle)) {
      return NextResponse.json({ message: "Please enter your details without links." }, { status: 400 });
    }

    const name = escapeHtml(rawName);
    const email = escapeHtml(rawEmail);
    const jobTitle = escapeHtml(rawJobTitle);

    // Log consent record to database
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
          INSERT INTO consent_log (name, email, job_title, marketing_consent, consent_text, ip_address, page)
          VALUES (${rawName}, ${rawEmail}, ${rawJobTitle}, ${rawConsent}, ${CONSENT_TEXT}, ${ip}, '/Compliance')
        `;
      } catch (dbErr) {
        console.error("Consent log DB error:", dbErr);
        // Non-fatal: continue with email delivery even if DB write fails
      }
    }

    // Notification to Stefan
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@xrnord.com",
      to: "SW@xrnord.com",
      subject: `New executive summary request: ${name}`,
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px; border-bottom: 2px solid #A855F7; padding-bottom: 10px;">New Executive Summary Request</h2>
              <div style="margin-bottom: 16px;">
                <p style="margin: 0; color: #6B7280; font-size: 12px;">NAME</p>
                <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${name}</p>
              </div>
              <div style="margin-bottom: 16px;">
                <p style="margin: 0; color: #6B7280; font-size: 12px;">EMAIL</p>
                <p style="margin: 4px 0 0;"><a href="mailto:${email}" style="color: #A855F7; text-decoration: none; font-size: 16px;">${email}</a></p>
              </div>
              <div style="margin-bottom: 16px;">
                <p style="margin: 0; color: #6B7280; font-size: 12px;">JOB TITLE</p>
                <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${jobTitle}</p>
              </div>
              <div style="margin-bottom: 16px;">
                <p style="margin: 0; color: #6B7280; font-size: 12px;">MARKETING CONSENT</p>
                <p style="margin: 4px 0 0; font-size: 15px; font-weight: 600; color: ${rawConsent ? "#16A34A" : "#9CA3AF"};">${rawConsent ? "✓ Yes — consented to follow-up contact" : "✗ No — PDF only, no follow-up"}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">From the Compliance page executive summary gate.</p>
            </div>
          </body>
        </html>
      `,
    });

    // Delivery email to the requester
    await transporter.sendMail({
      from: `"xrNORD" <${process.env.SMTP_USER || "sw@xrnord.com"}>`,
      replyTo: "info@xrnord.com",
      to: rawEmail,
      subject: "Your xrNORD Executive Summary",
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #111827; margin-bottom: 20px;">Compliance as a Living Capability</h2>
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">Hi ${name},</p>
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest. Here is the executive summary you requested.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${pdfUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #A855F7, #818CF8); color: white; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 16px;">
                  Download the Executive Summary
                </a>
              </div>
              <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px; font-size: 14px;">
                If the button does not work, copy this link into your browser:<br>
                <a href="${pdfUrl}" style="color: #A855F7; word-break: break-all;">${pdfUrl}</a>
              </p>
              <p style="color: #374151; line-height: 1.6; margin-bottom: 8px;">
                If you would like to talk through what this could look like in your organisation, reply to this email or reach us at <a href="mailto:info@xrnord.com" style="color: #A855F7;">info@xrnord.com</a>.
              </p>
              <p style="color: #374151; line-height: 1.6;">
                Best regards,<br>
                <strong>Stefan Werge</strong><br>
                xrNORD
              </p>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">xrNORD | Continuous Compliance Framework</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ message: "Sent" }, { status: 200 });
  } catch (error) {
    console.error("Executive summary form error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again or email info@xrnord.com." },
      { status: 500 }
    );
  }
}
