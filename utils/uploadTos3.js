import AWS from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
} from '../constant/constant.js';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  sessionToken: AWS_SESSION_TOKEN,
});

/**
 * Uploads a file to AWS S3 bucket
 * @param {File} file - File object to upload
 * @returns {Promise<string>} - Returns a Promise containing the URL of the uploaded file
 */

const uploadToS3 = async (fileBuffer, fileName, directory) => {
  try {
    const uploadParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: directory + '/' + Date.now().toString() + '-' + fileName, // Generate a unique key for the file
      Body: fileBuffer, // Pass the file buffer instead of the entire file object
      ACL: 'public-read', // Adjust permissions as necessary
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    return uploadResult.Location; // Assuming Location contains the URL
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

export default uploadToS3;
