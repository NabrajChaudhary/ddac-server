

import AWS from 'aws-sdk';

const AWS_ACCESS_KEY_ID = 'ASIA4MTWJNNJ23JAU44B';
const AWS_SECRET_ACCESS_KEY = 'pEE3Q4M8F76wSOnLfEs5hdQsdFzXMk/DREyy1wa8';
const AWS_REGION = 'us-east-1';
const AWS_SESSION=`IQoJb3JpZ2luX2VjEIv//////////wEaCXVzLXdlc3QtMiJIMEYCIQDBNafY/rNLWSi0s9UjAgWIIcPQ+kBDhnKhTyhIyE0obgIhAMVg+4B0ORAaLkcljc62edueFwYBpFJVk4QKE5l7TsySKsICCNT//////////wEQABoMODUxNzI1MzQ3NjY3IgzFj+TrT6ZQgCEmHaEqlgLhND3HELuPpbUZTQxQs0l1Rsh1kF2UiAF6q8jqyrUOGBc+3xAFtza0jNEp2Hv8IB8Ln6BkDhKF7nyQtKlTXe2Gwfo9WvXlvaOXi3ltm53Gh5mWj9tdxbL22oQTNCraMKTgW9S9NHBrUpnlCepxBMQBuN+GJjmiKa6l/cnHnGDuNwuGkKIu5sHj65kpWGW0KqcAnSif1GoREhCkayP/cljq3RG3LF5Byd/j60sQSeq7QgKWqo8wKTwLPengLgpSTurQ/XHf7De4JkmtlPybY5gJ+/ybwPOR9UnlrtYlic9btRXa7FCkKOI8f85CHlr5Vll8GAethtyY7sBrBoTvVdFvV/VibZjM4CqW6NyBvhF3IoHUMBh1IjDAubOxBjqcAYOEe3hEunTpmCVL4ec1sJ/oCfYTAJ/GX80/1ponFW0OCk1LOJFRW6zOVwcDc8BMvC4Sr1bFH0BreveM7zy/ovEB1aO08y2cSwT1Y/AhRnQp+E1At4Hc+zI0kNwwiE7KDSN8Hq8BpW3oEKa/uhdahEJfS2d/0ypQJE3rQTxoTMTobVmlRMYXRFMkB3JXN3vw1rHmvmH5e1xL1mj9MA==`
const AWS_S3_BUCKET_NAME = 'feedtheneed-bucket';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
sessionToken:AWS_SESSION,
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