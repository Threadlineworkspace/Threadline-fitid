import express from 'express';
import { 
  adminLogin,
  getUsers,
  getUserById,
  exportUsersCSV,
  getStats
} from '../controllers/adminController.js';
import { verifyToken } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts. Please try again later.'
});

// Public routes
router.post('/login', loginLimiter, adminLogin);

// Protected routes
router.use(verifyToken);

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/export', exportUsersCSV);
router.get('/stats', getStats);

export default router;