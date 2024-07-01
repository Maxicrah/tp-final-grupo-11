const { isValidObjectId } = require('mongoose');
const Rol = require('../model/rol');
const rolCtrl = {};

rolCtrl.getAllRoles = async (req, res) => {
    try {
        const roles = await Rol.find();
        res.json({ data: roles });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

rolCtrl.createRol = async (req, res) => {
    const rol = new Rol(req.body);
    try {
        const newRol = await Rol.create(rol);
        res.json({ data: newRol });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

rolCtrl.updateRol = async (req, res) => {
    const id = req.body._id;
    if(!id && !isValidObjectId(id)) {
        return res.status(400).json({
            status: '0',
            message: 'El ID del rol no es válido.'
        });
    }

    try {
        const rol = await Rol.findByIdAndUpdate(id, req.body, { new: true });
        if(!rol) {
            return res.status(404).json({
                status: '0',
                message: 'El rol no fue encontrado.'
            });
        }
        res.json({ data: rol });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.' 
        });
    }
}

rolCtrl.getAllRolId = async (req, res) => {
    try {
        const rol = await Rol.findById(req.params.id);
        if(!rol) {
            return res.status(404).json({
                status: '0',
                message: 'El rol no fue encontrado.'
            });
        }
        res.json({ data: rol });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

rolCtrl.deleteRol = async (req, res) => {
    const id = req.params.id;
    if(!id &&!isValidObjectId(id)) {
        return res.status(400).json({
            status: '0',
            message: 'El ID del rol no es válido.'
        });
    }

    try {
        const rol = await Rol.findByIdAndDelete(id);
        if(!rol) {
            return res.status(404).json({
                status: '0',
                message: 'El rol no fue encontrado.'
            });
        }
        res.json({ message: 'Rol eliminado correctamente.' });
    } catch {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

module.exports = rolCtrl;

