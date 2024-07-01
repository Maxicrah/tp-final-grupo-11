const mongoose = require('mongoose');
const Usuario = require('../model/usuario');
const jwt = require('jsonwebtoken');
const Propietario = require('../model/propietario');

const usuarioCtrl = {};

usuarioCtrl.getAllUsuarios = async (req, res) => {
    var usuario = await Usuario.find().populate('rol');
    try {
        res.json({ data: usuario });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

usuarioCtrl.createPropietarioYUsuario = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { apellido, nombre, dni, email, telefono, domicilio } = req.body;

    try{
        const usuario = new Usuario(req.body.usuario);
        const usuarioGuardado = await usuario.save();

        const propietario = new Propietario({
            apellido,
            nombre,
            dni,
            email,
            telefono,
            domicilio,
            usuario: usuarioGuardado._id,
        });
        const propietarioGuardado = await propietario.save();

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: 'Usuario creado correctamente', status: '1' });
        console.log('Usuario y propietario con exito', propietarioGuardado);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(200).json({ message: 'Usuario no creado', status: '0' });
        console.error('Error al crear usuario y propietario', error);
    }
}

usuarioCtrl.loginUsuario = async (req, res) => {
    console.log('Entrando al login');
    const criterio = {
        nombreUsuario: req.body.nombreUsuario,
        password: req.body.password,
    }

    try {
        const usuario = await Usuario.findOne(criterio).populate('rol');
        console.log('Usuario encontrado', usuario);
        if (!usuario) {
            res.json({
                status: 0,
                message: "Usuario no encontrado"
            })
        } else {
            console.log("Usuario ingresado correctamente: ", usuario);
            //const unToken = jwt.sign({ id: usuario._id, rol: usuario.rol.nombreRol }, "secretKey");
            if (usuario.rol.nombreRol === 'propietario') {
                const propietarioFind = await Propietario.find({ usuario: usuario._id });
                res.json({
                    status: 1,
                    message: "Usuario ingresado correctamente",
                    //token: unToken,
                    propietario: propietarioFind
                })
            }

            if (usuario.rol.nombreRol === 'administrador') {
                res.json({
                    status: 1,
                    message: "Usuario encuentado correctamente",
                    username: usuario.nombreUsuario,
                    rol: usuario.rol,
                    userid: usuario._id,
                    //token: unToken
                })
            }

            if (usuario.rol.nombreRol === 'duenio') {
                res.json({
                    status: 1,
                    message: "Usuario encuentado correctamente",
                    username: usuario.nombreUsuario,
                    rol: usuario.rol,
                    userid: usuario._id,
                    //token: unToken
                })
            }
        }
    } catch (error) {
        console.log("Error al loguearse: ", error);
        res.json({
            status: 0,
            message: "Error al ingresar al sistema"
        })
    }
}

usuarioCtrl.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if(!usuario) {
            return res.status(404).json({
                status: '0',
                message: 'El usuario no fue encontrado.'
            });
        }
        res.json({ data: usuario });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

usuarioCtrl.createUsuario = async (req, res) => {
    var usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.json({
            status: '1',
            message: 'Usuario guardado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error al guardar el usuario.'
        });
    }
}

usuarioCtrl.updateUsuario = async (req, res) => {
    const vusuario = new Usuario(req.body);
    try{
        await Usuario.updateOne({_id: req.params.id}, vusuario);
        res.json({
            status: '1',
            message: 'Usuario actualizado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error al actualizar el usuario.'
        });
    }
}

usuarioCtrl.deleteUsuario = async (req, res) => {
    try{
        await Usuario.deleteOne({_id: req.params.id});
        res.json({
            status: '1',
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error al eliminar el usuario.'
        });
    }
}

module.exports = usuarioCtrl;