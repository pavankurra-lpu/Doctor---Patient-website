import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, verifyRegistrationOTP, requestLoginOTP, verifyLoginOTP } from './modules/auth/auth.controller';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/register', register);
app.post('/auth/register/verify-otp', verifyRegistrationOTP);
app.post('/auth/login/request-otp', requestLoginOTP);
app.post('/auth/login/verify-otp', verifyLoginOTP);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\Backend running on port \\);
});
