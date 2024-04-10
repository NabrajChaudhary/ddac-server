// dbConnection.js

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
// Function to create and return a connection object

// const user = process.env.USER || '';
// const host = process.env.HOST || '';
// const password = process.env.PASSWORD || '';
// const database = process.env.DATABASE || '';

const user = 'root';
const host = 'ddac-database.cluster-cp8go66mcog5.us-east-1.rds.amazonaws.com';
const password = '#*5NsYL[P~[rNkWKw$W7~T?$jjhA';
const database = 'ddac_app';

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  });

  connection.connect((error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('The database is successfully connected.');
  });

  return connection;
};

export default createConnection;
