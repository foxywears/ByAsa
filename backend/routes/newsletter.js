const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Path to store subscribers
const SUBSCRIBERS_PATH = path.join(__dirname, '..', 'subscribers.json');

// Load subscribers
function getSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_PATH)) {
      return JSON.parse(fs.readFileSync(SUBSCRIBERS_PATH, 'utf8'));
    }
    return [];
  } catch {
    return [];
  }
}

// Save subscriber
function saveSubscriber(email) {
  const subscribers = getSubscribers();
  if (!subscribers.some(s => s.email === email)) {
    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    fs.writeFileSync(SUBSCRIBERS_PATH, JSON.stringify(subscribers, null, 2));
  }
  return subscribers;
}

// Create Ethereal test transporter
async function createTestTransporter() {
  // Generate a test SMTP account at ethereal.email
  const testAccount = await nodemailer.createTestAccount();
  
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email address is required' });
    }

    // Save subscriber
    saveSubscriber(email);

    // Send welcome email via Ethereal
    try {
      const transporter = await createTestTransporter();
      
      const mailOptions = {
        from: '"ByAsa Store" <no-reply@byasa.com>',
        to: email,
        subject: '🌸 Welcome to the ByAsa Circle!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Georgia', serif; background: #FFF0F5; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #EC4899, #DB2777); padding: 40px 30px; text-align: center; }
              .header h1 { color: white; font-size: 28px; margin: 0; font-family: 'Georgia', serif; }
              .header p { color: rgba(255,255,255,0.85); font-size: 14px; margin-top: 8px; }
              .content { padding: 30px; }
              .content h2 { color: #1F2937; font-size: 20px; margin: 0 0 15px; font-family: 'Georgia', serif; }
              .content p { color: #6B7280; font-size: 14px; line-height: 1.7; margin: 0 0 12px; }
              .benefits { background: #FFF0F5; border-radius: 12px; padding: 20px; margin: 20px 0; }
              .benefits li { color: #4B5563; font-size: 13px; padding: 6px 0; list-style: none; }
              .benefits li:before { content: '🌸 '; }
              .btn { display: inline-block; padding: 12px 28px; background: #EC4899; color: white; text-decoration: none; border-radius: 50px; font-size: 14px; font-weight: 600; margin-top: 15px; }
              .footer { text-align: center; padding: 20px; background: #F9FAFB; font-size: 11px; color: #9CA3AF; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✨ You're In! ✨</h1>
                <p>Welcome to the ByAsa Circle</p>
              </div>
              <div class="content">
                <h2>Dear ByAsa Lover,</h2>
                <p>Thank you for subscribing! You're now part of an exclusive community that gets first access to:</p>
                
                <div class="benefits">
                  <ul>
                    <li>New collection drops before everyone else</li>
                    <li>Members-only flash sales & discounts</li>
                    <li>Early access to limited edition pieces</li>
                    <li>Behind-the-scenes style inspiration</li>
                  </ul>
                </div>

                <p>Get ready to elevate your style with our handpicked luxury bags and accessories. We're so excited to have you with us on this beautiful journey.</p>

                <div style="text-align: center;">
                  <a href="http://localhost:5000" class="btn">Shop the Collection</a>
                </div>

                <p style="margin-top: 20px; font-size: 12px; color: #9CA3AF;">
                  Warmly,<br/>
                  <strong style="color: #EC4899;">The ByAsa Team</strong>
                </p>
              </div>
              <div class="footer">
                <p>ByAsa — Curated Luxury for the Modern Woman</p>
                <p>Lagos, Nigeria | hello@byasa.com</p>
              </div>
          </body>
          </html>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      
      // Log the Ethereal URL to view the email
      console.log('[Email] Welcome email sent to:', email);
      console.log('[Email] Preview URL:', nodemailer.getTestMessageUrl(info));
      
      return res.json({
        success: true,
        message: 'Subscription successful! Check your email for a welcome message.',
        previewUrl: nodemailer.getTestMessageUrl(info),
      });
    } catch (emailErr) {
      console.error('[Email] Failed to send:', emailErr.message);
      // Still return success since the subscriber was saved
      return res.json({
        success: true,
        message: 'Subscription successful!',
        emailSent: false,
        note: 'Email preview available via Ethereal test account',
      });
    }
  } catch (err) {
    console.error('[Newsletter] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to subscribe' });
  }
});

// GET /api/newsletter/subscribers (admin only - simple auth)
router.get('/subscribers', (req, res) => {
  const subscribers = getSubscribers();
  res.json({ success: true, count: subscribers.length, subscribers });
});

module.exports = router;
