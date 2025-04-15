// Import express and userController
import express from 'express';
import userController from '../../controllers/userController.js';

const router = express.Router();

// api routes from /api/users
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

// /api/users/:userId
router.route('/:userId')
    .get(userController.getAllUsers)
    .put(userController.updateUsers)
    .delete(userController.deleteUsers);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.removeFriend);

export default router;