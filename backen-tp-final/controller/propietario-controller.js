const Propietario = require('../model/propietario');
const propietarioCtrl = {}
propietarioCtrl.getPropietarios = async (req, res) => {
    var propietarios = await Propietario.find();
    res.json(propietarios);
}
propietarioCtrl.createPropietario = async (req, res) => {
    var propietario = new Propietario(req.body);
    try {
        await propietario.save();
        res.json({
            'status': '1',
            'msg': 'Propietario guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
propietarioCtrl.getPropietario = async (req, res) => {
    const propietario = await Propietario.findById(req.params.id);
    res.json(propietario);
}
propietarioCtrl.editPropietario = async (req, res) => {
    const vpropietario = new Propietario(req.body);
    try {
        await Propietario.updateOne({ _id: req.body._id }, vpropietario);
        res.json({
            'status': '1',
            'msg': 'Propietario updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
propietarioCtrl.deletePropietario = async (req, res) => {
    try {
        await Propietario.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Propietario removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = propietarioCtrl;