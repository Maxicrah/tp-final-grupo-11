const jwt = require('jsonwebtoken');
const Propietario = require('../model/propietario');

const authCtrl = {};

authCtrl.verifyTokenAdmin = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({
            message: "Token no proveido.",
        });
    }
    const token = req.headers.authorization.split('')[1];
    console.log("Token admin: ", token);
    if (token === null) {
        res.json({
            message: "No existe un token.",
        })
    }

    const payload = jwt.verify(token,"secretKey");

    console.log(payload);
    req.userId = payload.id;
    req.userRol = payload.rol;

    if (req.userRol === "administrador") {
        console.log("Token admin verificado correctamente");
    } else {
        res.json({
            message: "No tienes permisos de administrador, " + "su perfil es: " +
            req.userRol
        })
    }
}

module.exports = authCtrl;

