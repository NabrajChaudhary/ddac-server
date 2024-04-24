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
//import AWS from 'aws-sdk';




dotenv.config();

/*
AWS.config.update({ region: 'US East (N. Virginia) us-east-1' });
const s3 = new AWS.S3();

s3.putObject({});

// Define parameters
const params = {
  Bucket: 'charity-app-s3',
};

*/



const app = express();
app.use(express.json());
app.use(cors());


/*
// List objects in the bucket
s3.listObjects(params, (err, data) => {
  if (err) {
    console.error('Error listing objects:', err);
  } else {
    console.log('Objects in bucket:', data.Contents);
  }
});

*/
const connection = createConnection();

app.get('/', (req, res) => {
res.send("Charity App is running available routes are auth, charity, donation, testimonials")});

app.use('/auth', authRouter);
app.use('/contact', contactUsRouter);
app.use('/charity', charityRoutes);
app.use('/donation', donationRoutes);
app.use('/testimonial', testimonialRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // connection();
});
