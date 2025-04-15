// Import Express and modular route files
import express from 'express';
import userRoutes from './api/userRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';

// Initialize the router instance
const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes); 

export default router;