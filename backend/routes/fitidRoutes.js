import express from 'express';
import { submitFitID, getUserByEmail } from '../controllers/fitidController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for submissions (5 per minute)
const submitLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: 'Too many submissions. Please wait a moment before trying again.'
});

// Public routes
router.post('/submit', submitLimiter, submitFitID);
router.get('/user/:email', getUserByEmail);

export default router;