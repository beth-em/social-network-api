// Build Mongoose Model for users
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Create user schema including, unique and required! username, email and references to Thought ID's and other User ID's (friends list)
const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {    // Email must me unique: 'true' and match a basic pattern e.g. "/.+@.+\\..+/"
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true, // Enable use of `friendCount` virtual
        },
        id: false,      // Prevent Mongoose from creating duplicate 'id' field
    }
);

// Virtual field to return the number of friends a uswer has
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

export default User;
