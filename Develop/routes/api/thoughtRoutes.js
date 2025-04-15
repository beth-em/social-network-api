// Import express and thoughtController
import express from 'express';
import thoughtController from '../../controllers/thoughtController.js';

const router = express.Router();

// Add routes for Thoughts
router
    .route('/')
    .get(thoughtController.getAllThoughts)    // GET all thoughts
    .post(thoughtController.createThought);   // POST a new thought

// Add routes for /api/thoughts/:thoughtsId
router
    .route('/')
    .get(thoughtController.getThoughtById)     // GET one thought
    .put(thoughtController.updateThought)      // PUT update a thought
    .delete(thoughtController.deleteThought);  // DELETE a thought

// Add routes for Reactions
router 
    .route('/:thoughtsId/reactions')
    .post(thoughtController.addReaction);       // POST add a reaction

// Add routes for /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.removeReaction);  // DELETE a reaction

export default router;