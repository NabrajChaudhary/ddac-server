import express from 'express';
import {
  deleteCharityById,
  getAllCharity,
  postCharity,
} from '../controllers/charityController.js';
import { isAdmin } from '../middlewares/auth.js';

export const charityRoutes = express.Router();

charityRoutes.post('/add', isAdmin, postCharity);
charityRoutes.get('/getAll', isAdmin, getAllCharity);
charityRoutes.delete('/delete/:id', isAdmin, deleteCharityById);
