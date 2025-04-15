// Set up a MongoDB Connection
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileUrlToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileUrlToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect('mongodb://127.0.0.1:27017/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to log DB queries to terminal
mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
});