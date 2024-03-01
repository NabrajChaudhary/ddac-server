import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import createConnection from './config/dbConnection.js';
import { authRouter } from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const connection = createConnection();

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM notes';

  // Use the connection.query method to execute the SQL query
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // console.log('Result:', result);
    res.json(result);
  });
});

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // connection();
});
