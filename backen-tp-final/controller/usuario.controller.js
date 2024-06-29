const Usuario = require('../model/usuario');
const usuarioCtrl = {};

usuarioCtrl.getAllUsuarios = async (req, res) => {
    try {
        const usuario = await Usuario.find().populate('rol');
        res.json({ data: usuario });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

usuarioCtrl.updateUsuario = async (req, res) => {
    try{
        const updateUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: '1',
            message: 'Usuario actualizado correctamente',
            data: updateUsuario
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
        const deleteUsuario = await Usuario.deleteOne({_id: req.params.id});
        if (!deleteUsuario) return res.status(404).json({ message: 'El usuario no fue encontrado.' });
        res.json({
            status: '1',
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error al eliminar el usuario.'
        });
    }
}

module.exports = usuarioCtrl;