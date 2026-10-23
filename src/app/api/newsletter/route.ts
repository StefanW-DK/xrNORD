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
} from "@/lib/formGuard";

const CONSENT_TEXT =
  "I agree to receive xrNORD's articles, AI interviews and insights. You can unsubscribe at any time.";

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
    const body = await request.json().catch(() => ({}));

    const trap = botTrapReason(body);
    if (trap) {
      console.warn(`Newsletter: dropped submission (${trap})`);
      return NextResponse.json({ message: "Subscribed" }, { status: 200 });
    }

    if (isRateLimited("newsletter", clientIp(request))) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const rawEmail = str(body.email);
    const rawLocale = str(body.locale) || "en";
    const rawSourcePage = str(body.sourcePage) || "/";
    const ip = clientIp(request);

    if (!rawEmail) {
      return NextResponse.json({ message: "Please enter your email address." }, { status: 400 });
    }

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const email = escapeHtml(rawEmail);

    // Store in database
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
          INSERT INTO newsletter_subscribers (email, consent_text, ip_address, source_page, locale)
          VALUES (${rawEmail}, ${CONSENT_TEXT}, ${ip}, ${rawSourcePage}, ${rawLocale})
          ON CONFLICT (email) DO UPDATE SET
            subscribed_at = NOW(),
            status = 'active',
            ip_address = EXCLUDED.ip_address,
            source_page = EXCLUDED.source_page
        `;
      } catch (dbErr) {
        console.error("Newsletter DB error:", dbErr);
      }
    }

    // Notify Stefan
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@xrnord.com",
      to: "SW@xrnord.com",
      subject: `New newsletter subscriber: ${rawEmail}`,
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
              <h2 style="color: #111827; border-bottom: 2px solid #06B6D4; padding-bottom: 10px; margin-bottom: 20px;">New Newsletter Subscriber</h2>
              <p style="margin: 0; color: #6B7280; font-size: 12px;">EMAIL</p>
              <p style="margin: 4px 0 16px;"><a href="mailto:${email}" style="color: #06B6D4; font-size: 16px;">${email}</a></p>
              <p style="margin: 0; color: #6B7280; font-size: 12px;">SOURCE</p>
              <p style="margin: 4px 0 16px; color: #111827;">${rawSourcePage} (${rawLocale})</p>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">From the xrNORD newsletter footer form.</p>
            </div>
          </body>
        </html>
      `,
    });

    // Welcome email to subscriber
    const isDa = rawLocale === "da";
    await transporter.sendMail({
      from: `"xrNORD" <${process.env.SMTP_USER || "sw@xrnord.com"}>`,
      replyTo: "info@xrnord.com",
      to: rawEmail,
      subject: isDa ? "Du er tilmeldt xrNORDs nyhedsbrev" : "You're subscribed to xrNORD",
      html: `
        <html style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <body>
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
              <h2 style="color: #111827; margin-bottom: 20px;">
                ${isDa ? "Velkommen til xrNORDs nyhedsbrev" : "Welcome to xrNORD"}
              </h2>
              <p style="color: #374151; line-height: 1.6; margin-bottom: 16px;">
                ${isDa
                  ? "Du modtager nu xrNORDs artikler, AI-interviews og indsigter, direkte i din indbakke."
                  : "You will now receive xrNORD's articles, AI interviews and insights, straight to your inbox."}
              </p>
              <p style="color: #374151; line-height: 1.6; margin-bottom: 24px;">
                ${isDa
                  ? "Hvis du ønsker at afmelde dig, kan du gøre det ved at svare på denne mail."
                  : "If you ever want to unsubscribe, just reply to this email."}
              </p>
              <p style="color: #374151; line-height: 1.6;">
                ${isDa ? "De bedste hilsner," : "Best regards,"}<br>
                <strong>Stefan Werge</strong><br>
                xrNORD
              </p>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">xrNORD | AI for Business</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ message: "Subscribed" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
