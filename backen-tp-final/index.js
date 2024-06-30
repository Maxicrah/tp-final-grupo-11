require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectToDatabase = require('./config/mongo.config');
const PORT = 3000;

connectToDatabase();
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
//ruta roles
app.use('/api/rol', require('./route/rol.route'));
//ruta usuarios
app.use('/api/usuario', require('./route/usuario.route'));
//ruta locales
app.use('/api/locales', require('./route/local.route'));
//ruta propietarios
app.use('/api/propietario', require('./route/propietario.route'));
//ruta pagos
app.use('/api/pago', require('./route/pago.route'));

app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = { app, server };
