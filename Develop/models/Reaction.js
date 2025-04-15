// Build reaction schema for use in Thought model
import mongoose from 'mongoose';
import { formatDate } from '../utils/formatDate.js';

const { Schema, Types } = mongoose;

// Add unique ID's, username and timestamps for users who created each of those entries
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate    // formatDate.js in utils folder
        },
    },
    {
        toJSON: {
            getters: true,    // Enable use of formatDate
        },
        id: false,            // Prevent Mongoose from creating a duplicate 'id' field
    }
);

export default reactionSchema;