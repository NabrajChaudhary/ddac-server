import multer from 'multer';
import path from 'path'; // Import path for path operations\

// Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join('test', '../config/images')); // Use path.join for safer path handling
//     // cb(null, path.join('test', {}));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);y
//   },
// });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

export default upload;
