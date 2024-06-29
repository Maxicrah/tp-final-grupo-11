const Administrativo = require('../model/administrativo');
const administrativoCtrl = {};

administrativoCtrl.getAllAdministrativos = async (req, res) => {
    try {
        const administrativos = await Administrativo.find().populate('usuario');
        res.json(administrativos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

administrativoCtrl.createAdministrativo = async (req, res) => {
    var administrativo = new Administrativo(req.body);
    try {
        const newAdministrativo = await administrativo.save();
        res.json({
            'status': '1',
            'message': 'El administrativo ha sido creado correctamente',
            data: newAdministrativo
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'message': 'Error al crear el administrativo',
            'error': error.message
        })
    }
}

administrativoCtrl.getAdministrativoById = async (req, res) => {
    try {
        const administrativo = await Administrativo.findById(req.params.id).populate('usuario');
        if(!administrativo) {
            return res.status(404).json({
                status: '0',
                message: 'El administrativo no fue encontrado.'
            });
        }
        res.json({ data: administrativo });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error procesando la operación. ' + error.message
        });
    }
}

administrativoCtrl.updateAdministrativo = async (req, res) => {
    try {
        const updatedAdministrativo = await Administrativo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedAdministrativo) {
            return res.status(404).json({
                status: '0',
                message: 'El administrativo no fue encontrado.'
            });
        }
        res.json({ 
            status: '1',
            message: 'El administrativo ha sido actualizado correctamente',
            data: updatedAdministrativo });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

administrativoCtrl.deleteAdministrativo = async (req, res) => {
    try {
        const deletedAdministrativo = await Administrativo.deleteOne({ _id: req.params.id });
        if (!deletedAdministrativo) return res.status(404).json({ message: 'El administrativo no fue encontrado.' });
        res.json({
            status: '1',
            message: 'El administrativo ha sido eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error al eliminar el administrativo.'
        });
    }
}

module.exports = administrativoCtrl;