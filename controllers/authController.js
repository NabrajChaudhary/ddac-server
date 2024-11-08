// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import createConnection from '../config/dbConnection.js';
// import { generateId } from '../utils/globalFunction.js';

// const SECRET_KEY = 'NOTESAPI';

// const connection = createConnection();

// export const signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     connection.query(
//       'SELECT * FROM users WHERE email = ?',
//       [email],
//       async (error, results) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ message: 'Internal server error' });
//         }

//         if (results.length > 0) {
//           const user = results[0];
//           // Compare the user-entered password with the hashed password in the database
//           const matchPassword = await bcrypt.compare(password, user.password);

//           if (matchPassword) {
//             try {
//               // Passwords match, generate JWT token
//               const token = jwt.sign(
//                 {
//                   userID: user.user_id,
//                   role: user.role,
//                 },
//                 SECRET_KEY
//               );

//               res.status(200).json({
//                 token,
//                 role: user.role,
//                 message: 'User logged in successfully',
//               });
//             } catch (jwtError) {
//               console.error('JWT Error:', jwtError);
//               res.status(500).json({ message: 'Error generating JWT token' });
//             }
//           } else {
//             // Passwords don't match
//             res.status(401).json({ message: 'Invalid credentials' });
//           }
//         } else {
//           // No user found with the provided email
//           res.status(401).json({ message: 'Invalid credentials' });
//         }
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getProfile = async (req, res) => {
//   const userID = req.userId;
//   try {
//     connection.query(
//       'SELECT * FROM users WHERE user_id = ?',
//       [userID],
//       async (error, results) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ message: 'Internal server error' });
//         }

//         if (results.length === 0) {
//           res.status(404).json({ message: 'Profile not found' });
//           return;
//         }

//         const { user_id, password, ...rest } = results[0];

//         res.status(200).json({
//           data: { ...rest, id: user_id.toString() },
//           message: 'Data fetched successfully!',
//         });
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// export const signup = async (req, res) => {
//   const { email, password, username } = req.body;

//   try {
//     // Check if the user with the provided email already exists
//     const userExists = await checkIfUserExists(email);

//     if (userExists) {
//       return res
//         .status(400)
//         .json({ message: 'User with this email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // If the user doesn't exist, proceed to create a new user
//     const newUser = {
//       user_id: generateId(),
//       email,
//       password: hashedPassword,
//       username,
//     };

//     // Insert the new user into the database
//     const insertUserQuery =
//       'INSERT INTO users (user_id,email, password, username) VALUES (?,?,?,?)';
//     const insertUserValues = [
//       newUser.user_id,
//       newUser.email,
//       newUser.password,
//       newUser.username,
//     ];

//     connection.query(insertUserQuery, insertUserValues, (error, results) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error creating user' });
//       }
//       res.status(201).json({
//         message: 'User has been create ! successfully',
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Function to check if a user with the provided email already exists
// const checkIfUserExists = async (email) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT * FROM users WHERE email = ?`,
//       [email],
//       (error, results) => {
//         if (error) {
//           console.error(error);
//           reject(error);
//         }

//         resolve(results.length > 0);
//       }
//     );
//   });
// };

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createConnection from '../config/dbConnection.js';
import { generateId } from '../utils/globalFunction.js';

const SECRET_KEY = 'NOTESAPI';
const connection = createConnection();

// Function to query user by email
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results.length ? results[0] : null);
        }
      }
    );
  });
};

// Function to generate JWT token
const generateJWT = (user) => {
  return jwt.sign(
    {
      userID: user.user_id,
      role: user.role,
    },
    SECRET_KEY
  );
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateJWT(user);
      res.status(200).json({
        token,
        role: user.role,
        message: 'User logged in successfully',
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  const userID = req.userId;

  try {
    const results = await getUserById(userID);

    if (results.length === 0) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    const { user_id, password, ...rest } = results[0];

    res.status(200).json({
      data: { ...rest, id: user_id.toString() },
      message: 'Data fetched successfully!',
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to query user by ID
const getUserById = (userID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM users WHERE user_id = ?',
      [userID],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userExists = await checkIfUserExists(email);

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      user_id: generateId(),
      email,
      password: hashedPassword,
      username,
    };

    const insertUserQuery =
      'INSERT INTO users (user_id,email, password, username) VALUES (?,?,?,?)';
    const insertUserValues = [
      newUser.user_id,
      newUser.email,
      newUser.password,
      newUser.username,
    ];

    connection.query(insertUserQuery, insertUserValues, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
        return;
      }
      res.status(201).json({
        message: 'User has been created successfully',
      });
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to check if a user with the provided email already exists
const checkIfUserExists = async (email) => {
  try {
    const results = await getUserByEmail(email);
    return results !== null;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};
