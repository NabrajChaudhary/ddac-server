// dbConnection.js

import mysql from 'mysql2';

// Function to create and return a connection object
const createConnection = () => {
  const connection = mysql.createConnection({
    host: 'ddac-test.cp8go66mcog5.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'ddac_app',
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
