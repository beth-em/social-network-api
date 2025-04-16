console.log('THIS IS DEVELOP/index.js RUNNING');
// Set up a MongoDB Connection
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Mounting API routes...');
// API routes
app.use('/api', routes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to log DB queries to terminal
mongoose.set('debug', true);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
});