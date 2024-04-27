import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const ADMIN = process.env.ADMIN;
export const MINU = process.env.AWS_TEST_KEY;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
export const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;
