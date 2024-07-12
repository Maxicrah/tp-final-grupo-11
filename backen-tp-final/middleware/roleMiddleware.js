const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario');


const verifyRole = (requiredRole) => {
    return async (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'No token, autorización denegada' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = decoded.usuario;

            const usuario = await Usuario.findById(req.usuario.id).populate('rol');
            if (!usuario) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            if (usuario.rol.nombreRol !== requiredRole) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            next();
        } catch (err) {
            res.status(400).json({ message: 'Token no válido' });
        }
    };
};

module.exports = verifyRole;