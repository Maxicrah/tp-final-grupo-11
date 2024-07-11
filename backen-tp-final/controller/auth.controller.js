const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../model/usuario');
const Rol = require('../model/rol');

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

        const propietarioRole = await Rol.findOne({ nombreRol: 'propietario' });

        usuario = new Usuario({
            nombreUsuario,
            password,
            rol: rol || propietarioRole._id
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

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
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
            res.status(200).json({ token, rol: usuario.rol.nombreRol });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
authCtrl.refreshToken = async (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        console.log('Decoded in refreshToken:', decoded);

        const newPayload = {
            usuario: {
                id: decoded.usuario.id,
                rol: decoded.usuario.rol
            }
        };

        jwt.sign(newPayload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, newToken) => {
            if (err) throw err;
            res.status(200).json({ token: newToken });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ message: 'Token no válido' });
    }
}


authCtrl.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        console.log('Decoded in verifyToken:', decoded);
        req.usuario = decoded.usuario;
        next();
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ message: 'Token no válido' });
    }
}
module.exports = authCtrl;

