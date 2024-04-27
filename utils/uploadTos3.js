// // File: s3Uploader.js

// import AWS from 'aws-sdk';

// export const AWS_ACCESS_KEY_ID = 'ASIA6GBMA2LG4ZCDV2BJ';
// export const AWS_SECRET_ACCESS_KEY = 'uiun8fYg2QsrykdEfeHcE2wX30tmQ2F/4t3lYSKw';
// export const AWS_REGION = 'us-east-1';
// export const AWS_S3_BUCKET_NAME = 'charity-app-s3';

// const s3 = new AWS.S3({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: AWS_REGION,
// });

// /**
//  * Uploads a file to AWS S3 bucket
//  * @param {string} filePath - File path of the file to upload
//  * @returns {Promise<Object>} - Returns a Promise containing upload result
//  */
// const uploadToS3 = async (filePath) => {
//   try {
//     const uploadParams = {
//       Bucket: AWS_S3_BUCKET_NAME,
//       Key: Date.now().toString() + '-' + filePath.split('/').pop(), // Generate a unique key for the file
//       Body: require('fs').createReadStream(filePath),
//       ACL: 'public-read', // Adjust permissions as necessary
//     };

//     const uploadResult = await s3.upload(uploadParams).promise();
//     return uploadResult;
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };

import AWS from 'aws-sdk';

const AWS_ACCESS_KEY_ID = 'ASIA6GBMA2LG4ZCDV2BJ';
const AWS_SECRET_ACCESS_KEY = 'uiun8fYg2QsrykdEfeHcE2wX30tmQ2F/4t3lYSKw';
const AWS_REGION = 'us-east-1';
const AWS_S3_BUCKET_NAME = 'charity-app-s3';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

/**
 * Uploads a file to AWS S3 bucket
 * @param {File} file - File object to upload
 * @returns {Promise<string>} - Returns a Promise containing the URL of the uploaded file
 */
const uploadToS3 = async (file) => {
  try {
    const uploadParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: Date.now().toString() + '-' + file.name, // Generate a unique key for the file
      Body: file,
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
