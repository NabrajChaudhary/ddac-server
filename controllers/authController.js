import jwt from 'jsonwebtoken';
import createConnection from '../config/dbConnection.js';

const SECRET_KEY = 'NOTESAPI';

const connection = createConnection();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    connection.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
          const user = results[0];
          const token = jwt.sign(
            { email: user.email, id: user.user_id },
            SECRET_KEY
          );
          res.status(200).json({
            token,
            message: 'User logged in successfully',
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    connection.query('SELECT * FROM users LIMIT 1', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }

      const { user_id, password, ...rest } = results[0];

      res.status(200).json({
        data: { ...rest, id: user_id.toString() },
        message: 'Data fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
