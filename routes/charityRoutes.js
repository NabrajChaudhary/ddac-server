import express from 'express';
import {
  deleteCharityById,
  getAllCharity,
  postCharity,
  updateCharityById,
} from '../controllers/charityController.js';
import { auth, isAdmin } from '../middlewares/auth.js';

export const charityRoutes = express.Router();

charityRoutes.post('/add', auth, postCharity);
charityRoutes.get('/getAll',  auth, getAllCharity);
charityRoutes.delete('/delete/:id', isAdmin, deleteCharityById);
charityRoutes.put('/update/:id', updateCharityById);
