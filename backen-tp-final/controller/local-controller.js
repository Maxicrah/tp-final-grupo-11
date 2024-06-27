const Local = require('../model/local');

const localCtrl = {};

// Obtener todos los locales
localCtrl.getLocales = async (req, res) => {
    try {
        const locales = await Local.find();
        res.json(locales);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

// Crear un nuevo local
localCtrl.createLocal = async (req, res) => {
    const local = new Local(req.body);
    try {
        await local.save();
        res.json({
            status: '1',
            msg: 'Local guardado.'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

// Obtener un local por ID
localCtrl.getLocal = async (req, res) => {
    try {
        const local = await Local.findById(req.params.id);
        res.json(local);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

// Editar un local
localCtrl.editLocal = async (req, res) => {
    try {
        await Local.updateOne({ _id: req.body._id }, req.body);
        res.json({
            status: '1',
            msg: 'Local actualizado.'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

// Eliminar un local
localCtrl.deleteLocal = async (req, res) => {
    try {
        await Local.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Local eliminado.'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

module.exports = localCtrl;
