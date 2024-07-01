const Administrativo = require('../model/administrativo');
const administrativoCtrl = {};

administrativoCtrl.getAllAdministrativos = async (req, res) => {
    var administrativos = await Administrativo.find();
    res.json({ data: administrativos });
}

administrativoCtrl.createAdministrativo = async (req, res) => {
    var administrativo = new Administrativo(req.body);
    try {
        await administrativo.save();
        res.json({
            'status': '1',
            'message': 'El administrativo ha sido creado correctamente',
            data: administrativo
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'message': 'Error al crear el administrativo'
        })
    }
}

administrativoCtrl.getAdministrativoById = async (req, res) => {
    try {
        const administrativo = await Administrativo.findById(req.params.id);
        if(!administrativo) {
            return res.status(404).json({
                status: '0',
                message: 'El administrativo no fue encontrado.'
            });
        }
        res.json({ data: administrativo });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

administrativoCtrl.updateAdministrativo = async (req, res) => {
    try {
        const administrativo = await Administrativo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!administrativo) {
            return res.status(404).json({
                status: '0',
                message: 'El administrativo no fue encontrado.'
            });
        }
        res.json({ 
            status: '1',
            message: 'El administrativo ha sido actualizado correctamente',
            data: administrativo });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

administrativoCtrl.deleteAdministrativo = async (req, res) => {
    try {
        await Administrativo.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            message: 'El administrativo ha sido eliminado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error al eliminar el administrativo.'
        });
    }
}

module.exports = administrativoCtrl;