// dbConnection.js

import mysql from 'mysql';

// Function to create and return a connection object
const createConnection = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'edu_repo',
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
