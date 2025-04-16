// Import Thought model and User model for linking thoughts to users
import Thought from '../models/Thought.js';
import User from '../models/User.js';

// GET all thoughts
const thoughtController = {

async getAllThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
        }
    },
// GET single thought by ID
async getThoughtById(req, res) {
    try {
        const thought = await Thought.findById(req.params.thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
        }
    },
// POST create a new thought
async createThought(req, res) {
    try {
        // First - create the thought
        const newThought = await Thought.create(req.body);

        // Next - push the thought's ID to the user's thoughts array
        const user = await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought created, but no user found with that ID' });
        }

        res.json(newThought);
    } catch (err) {
        res.status(400).json(err);
        }
    },

// PUT update and existing thought
async updateThought(req, res) {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
        }
    },
// DELETE a thought and remove its reference from the user
async deleteThought(req, res) {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

        if (!deletedThought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
        }

        // Remove the thought's ID from the associated user's thoughts array
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );

        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
        }
    },
// POST add a reaction to a thought
async addReaction(req, res) {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
        }
    },
// DELETE a reaction from a thought
async removeReaction(req, res) {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
        }
    },
};

export default thoughtController;