// Build Thought model
import mongoose from 'mongoose';
import reactionSchema from './Reaction.js';
import { formatDate } from '../utils/formatDate.js';
const { Schema, model } = mongoose;

// Create content for the thought (1-280 characters) including: username, timestamps and an array of reactions
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate     // formatDate.js in utils folder
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,     // Enable virtual fields like 'reactionCount'
            getters: true,      // Enable custom formatting for timestamps
        },
        id: false,      // Prevent duplicate 'id' from being created
    }
);

// Virtual field to return the number of reactions from other users
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;