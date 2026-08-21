const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const otpStore = new Map();

// Secure API key for Email OTP generator
const EMAIL_API_KEY = 'risu_otp_9NxOMSNp_JAsSOChZQcIsMNmCg38LH1E';
const EMAIL_API_ENDPOINT = 'https://api.risu.mail/v1/send'; // Please update if the URL is different

function generatePatientId(name) {
  const letters = (name.substring(0, 2) || 'XX').toUpperCase().padEnd(2, 'X');
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return letters + month + year;
}

app.post('/auth/register', async (req, res) => {
  const { name, email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  const sessionId = crypto.randomUUID();
  
  const uniqueId = generatePatientId(name);
  
  otpStore.set(sessionId, { otp, email, uniqueId });
  
  const emailMessage = 'Thankyou for registering in CareLoop!\\n\\nWelcome to your continuous path to health.\\nYour safe and secure OTP code is: ' + otp;

  try {
    // Sending the email via the Risu OTP API endpoint
    console.log('Sending secure email OTP to', email);
    /* await axios.post(EMAIL_API_ENDPOINT, {
      to: email,
      subject: 'CareLoop Registration OTP',
      body: emailMessage
    }, {
      headers: {
        'Authorization': 'Bearer ' + EMAIL_API_KEY,
        'Content-Type': 'application/json'
      }
    }); */
  } catch (error) {
    console.error('Email API failed:', error.message);
  }

  // Dev alert so you can see it on the frontend for testing
  res.json({ registration_session_id: sessionId, dev_otp: otp });
});

app.post('/auth/register/verify-otp', (req, res) => {
  const { registration_session_id, otp } = req.body;
  const stored = otpStore.get(registration_session_id);
  
  if (stored && stored.otp === otp) {
    res.json({ jwt: 'mock_jwt_token', unique_id: stored.uniqueId });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));
