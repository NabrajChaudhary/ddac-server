import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import createConnection from './config/dbConnection.js';
import { authRouter } from './routes/authRoutes.js';
import { contactUsRouter } from './routes/contactUsRoute.js';
import { charityRoutes } from './routes/charityRoutes.js';
import { donationRoutes } from './routes/donationRoutes.js';
import { testimonialRoutes } from './routes/testimonialRoutes.js';
import { PORT } from './constant/constant.js';

import sendEmail from './utils/sendEmail.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connection = createConnection();

app.get('/', (req, res) => {
  res.send(
    'Charity App is running available routes are auth, charity, donation, testimonials'
  );
});

app.use('/auth', authRouter);
app.use('/contact', contactUsRouter);
app.use('/charity', charityRoutes);
app.use('/donation', donationRoutes);
app.use('/testimonial', testimonialRoutes);
app.get('/send-email', sendEmail);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // connection();
});
