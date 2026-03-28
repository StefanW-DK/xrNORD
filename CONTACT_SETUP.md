# Contact Form Setup Guide

The Contact page has been successfully created and is ready to use! However, you need to configure email settings to enable form submissions to be sent to `SW@xrnord.com`.

## Quick Start

1. Choose an email provider (Gmail recommended for development)
2. Configure the `.env.local` file with SMTP credentials
3. Test the contact form

---

## Option 1: Gmail (Recommended for Development)

### Steps:

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password:**
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password

3. **Update `.env.local`:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx
   SMTP_FROM=noreply@xrnord.com
   ```

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

## Option 2: SendGrid (Recommended for Production)

SendGrid is more reliable for production environments.

### Steps:

1. **Create SendGrid Account:**
   - Go to [SendGrid](https://sendgrid.com)
   - Sign up for a free account
   - Create an API key in Settings > API Keys

2. **Update `.env.local`:**
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASSWORD=SG.your-actual-api-key-here
   SMTP_FROM=noreply@xrnord.com
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

## Option 3: Outlook/Office365

### Steps:

1. **Update `.env.local`:**
   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@outlook.com
   SMTP_PASSWORD=your-password
   SMTP_FROM=your-email@outlook.com
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

## Testing the Contact Form

1. Navigate to `/en/contact` or `/da/contact`
2. Fill out the form with test data
3. Click "Send Message"
4. You should see a success message
5. Check your inbox at `SW@xrnord.com` for the submission

### What Happens:

- **Email to xrNORD:** Contact form data is sent to `SW@xrnord.com`
- **Confirmation Email:** An automatic confirmation email is sent to the user's email address

---

## Production Deployment

For production, use SendGrid or similar service:

1. Create a SendGrid account and API key
2. Set environment variables on your hosting platform (Vercel, etc.)
3. The same `.env.local` format works with hosting providers' environment variable settings

---

## Troubleshooting

### Email not sending?

1. **Check console errors:**
   - Look at terminal where `npm run dev` is running
   - Check browser console (F12 → Console tab)

2. **Verify credentials:**
   - Gmail: Make sure you used the 16-character App Password, not your regular password
   - SendGrid: Verify API key is correct
   - Outlook: Make sure password is correct and 2FA is handled

3. **Check SMTP settings:**
   - Correct host and port for your provider
   - Correct authentication method

### Confirmation email not working?

- The system automatically sends a confirmation email to the user
- If it's not arriving, check the same troubleshooting steps above
- May take a few seconds to arrive

---

## File Structure

- **`/src/app/[locale]/contact/page.tsx`** - Contact page component
- **`/src/app/api/contact/route.ts`** - Email API endpoint
- **`/messages/en.json`** - English translations
- **`/messages/da.json`** - Danish translations
- **`/.env.local`** - Environment variables (update with your credentials)

---

## Features

✅ Beautiful, modern contact form matching xrNORD design
✅ Bilingual support (English & Danish)
✅ Form validation
✅ Success/error messaging
✅ Confirmation emails to users
✅ Responsive design
✅ Contact info sidebar
✅ Response time indicator

---

## Next Steps

1. Choose your email provider and set up credentials
2. Update `.env.local` with SMTP settings
3. Restart dev server
4. Test the form
5. Deploy to production with hosting provider's environment variables

Need help? Check the email provider documentation or contact support.
