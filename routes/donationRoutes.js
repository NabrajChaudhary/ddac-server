import express from 'express';
import { add_donation, delete_donation, view_donation } from "../controllers/donationController.js";
import { auth, isAdmin } from "../middlewares/auth.js";

export const donationRoutes = express.Router();

donationRoutes.post('/add',  add_donation);
donationRoutes.get('/view',  view_donation);
donationRoutes.delete('/delete/:id', isAdmin, delete_donation);

