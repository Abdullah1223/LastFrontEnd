import { Router } from 'express';
import { 
  createDonation,
  getDonations,
  getDonationById,
  getDonationsByUser,
  getDonationStats
} from '../controllers/donation.js';
import { auth } from '../middleware/auth.js';

export const donationRouter = Router();

donationRouter.use(auth);

donationRouter.post('/', createDonation);
donationRouter.get('/', getDonations);
donationRouter.get('/stats', getDonationStats);
donationRouter.get('/:id', getDonationById);
donationRouter.get('/user/:userId', getDonationsByUser);