const express = require('express');
const cors = require('cors');

const connectToDatabase = require('./config/mongo.config');
const PORT = 3000;

connectToDatabase();
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/api/rol', require('./route/rol.route'));
app.use('/api/usuario', require('./route/usuario.route'));
app.use('/api/local', require('./route/local.route'));
app.use('/api/alquiler',require('./route/alquiler.route'));


app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



module.exports = { app, server };
