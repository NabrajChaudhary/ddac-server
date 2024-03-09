import express from 'express';
import {
  addDonation,
  deleteDonation,
  getDonationByCharityID,
  getDonationByUserID,
  viewDonation,
} from '../controllers/donationController.js';
import { auth, isAdmin } from '../middlewares/auth.js';

export const donationRoutes = express.Router();

donationRoutes.post('/add', addDonation);
donationRoutes.get('/all', viewDonation);
donationRoutes.get('/charity/:id', getDonationByCharityID);
donationRoutes.get('/user/:id', getDonationByUserID);
donationRoutes.delete('/delete/:id', isAdmin, deleteDonation);
