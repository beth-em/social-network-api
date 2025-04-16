// Import express and thoughtController
import express from 'express';
import thoughtController from '../../controllers/thoughtController.js';

const router = express.Router();

// Add routes for Thoughts
router.route('/')
    .get(thoughtController.getAllThoughts)    // GET all thoughts
    .post(thoughtController.createThought);   // POST a new thought

// Add routes for /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(thoughtController.getThoughtById)     // GET one thought
    .put(thoughtController.updateThought)      // PUT update a thought
    .delete(thoughtController.deleteThought);  // DELETE a thought

// Add routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(thoughtController.addReaction);         // POST add a reaction

// Add routes for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.removeReaction);  // DELETE a reaction

export default router;