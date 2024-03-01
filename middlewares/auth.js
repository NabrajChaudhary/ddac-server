// import jwt from 'jsonwebtoken';

// const SECRET_KEY = 'NOTESAPI'; // Replace with your actual secret key

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization;

//     if (!token || !token.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Unauthorized User' });
//     }

//     const tokenWithoutBearer = token.split(' ')[1];
//     const decodedToken = jwt.verify(tokenWithoutBearer, SECRET_KEY);

//     if (!decodedToken) {
//       return res.status(401).json({ message: 'Unauthorized User' });
//     }

//     req.userId = decodedToken.id; // Store user ID in request object for future use
//     next(); // Move to the next middleware/route handler
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ message: 'Unauthorized User' });
//   }
// };

// export default auth;

import jwt from 'jsonwebtoken';

const SECRET_KEY = 'NOTESAPI'; // Replace with your actual secret key

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }

    const tokenWithoutBearer = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenWithoutBearer, SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }

    req.userId = decodedToken.id; // Store user ID in request object for future use
    next(); // Move to the next middleware/route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized User' });
  }
};

export default auth;
