const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../model/usuario');

const authCtrl = {};

authCtrl.registerUser = async (req, res) => {
    const { nombreUsuario, password, rol } = req.body;

    try {
        let usuario = await Usuario.findOne({ nombreUsuario });
        if (usuario) {
            return res.status(400).json({
                status: '0',
                message: 'El usuario ya existe.'
            });
        }

        usuario = new Usuario({
            nombreUsuario,
            password,
            rol
        });

        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();

        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            res.status(201).json({ 
                data: usuario,
                token,
                message: 'Usuario registrado exitosamente'
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

authCtrl.loginUser = async (req, res) => {
    const { nombreUsuario, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ nombreUsuario }).populate('rol');
        if (!usuario) {
            return res.status(400).json({ message: 'Credenciales no válidas' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales no válidas' });
        }

        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

authCtrl.verifyToken = (req, res, next) => {
    const token = req.header('Autorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded.usuario;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token no válido' });
    }
}

module.exports = authCtrl;

