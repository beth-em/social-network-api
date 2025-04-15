// Import user and thought models
import User from '../models/User.js';
import Thought from '../models/Thought.js';

// GET all users
const userController = {
    
async getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
},

// GET single user by _id with populated thoughts and friends
async getUserById(req, res) {
    try {
        const user = await User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        if (!user) return res.status(400).json({ message: 'No user with that ID' });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

// PUT update user by _id
async updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) return res.status(400).json({ message: 'No user with that ID' });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},
// DELETE user by _id and remove their thoughts
async deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) return res.status(400).json({ message: 'No user with that ID' });

        // Remove associate thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts }});

        res.json({ message: 'User and their thoughts deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
},
// POST add a friend
async addFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'No user with that ID' });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},
// DELETE remove a friend
async removeFriend(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: 'No user with that ID' });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
};

export default userController;