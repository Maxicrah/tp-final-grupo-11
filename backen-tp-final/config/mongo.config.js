const mongoose = require('mongoose');

//comentar dependiendo cual acepte la conexion
//const MONGODB_URL = 'mongodb://localhost:27017/galeriasdb';
const MONGODB_URL = 'mongodb://127.0.0.1/galeriasdb';

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

module.exports = connectToDatabase;