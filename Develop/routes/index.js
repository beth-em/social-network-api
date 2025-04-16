// Import Express and modular route files
import express from 'express';
import userRoutes from './api/userRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';

// Initialize the router instance
const router = express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes); 

// Test route to see if router is working
router.get('/test', (req, res) => {
    res.send('Router is working!!');
});

export default router;