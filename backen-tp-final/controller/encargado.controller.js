const Encargado = require('../model/encargado');
const encargadoCtrl = {};

encargadoCtrl.getAllEncargados = async (req, res) => {
    try {
        const encargados = await Encargado.find().populate('usuario');
        res.json({ data: encargados });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

encargadoCtrl.createEncargado = async (req, res) => {
    const encargado = new Encargado(req.body);
    try {
        const newEncargado = await Encargado.create(encargado);
        res.json({ data: newEncargado });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

encargadoCtrl.getEncargadoById = async (req, res) => {
    try {
        const updateEncargado = await Encargado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updateEncargado) {
            return res.status(404).json({
                status: '0',
                message: 'El encargado no fue encontrado.'
            });
        }
        res.json({ data: updateEncargado });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

encargadoCtrl.updateEncargado = async (req, res) => {
    try {
        const updateEncargado = await Encargado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updateEncargado) {
            return res.status(404).json({
                status: '0',
                message: 'El encargado no fue encontrado.'
            });
        }
        res.json({ data: updateEncargado });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación. ' + error.message
        });
    }
}

encargadoCtrl.deleteEncargado = async (req, res) => {
    try {
        const deleteEncargado = await Encargado.deleteOne({ _id: req.params.id });
        if(!deleteEncargado) {
            return res.status(404).json({
                status: '0',
                message: 'El encargado no fue encontrado.'
            });
        }
        res.json({ message: 'Encargado eliminado correctamente.' });
    } catch {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

module.exports = encargadoCtrl;