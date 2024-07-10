const Propietario = require('../model/propietario');
// const Local = require('../model/local');
// const Pago = require('../model/pago');


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
    // Ver pagos realizados por un propietario
// propietarioCtrl.getPagos = async (req, res) => {
//     try {
//         const propietarioId = req.params.id;
//         const alquileres = await Alquiler.find({ propietario: propietarioId }).populate('pagoAlquiler');
//         const pagos = alquileres.flatMap(alquiler => alquiler.pagoAlquiler);
//         res.json(pagos);
//     } catch (error) {
//         res.status(500).json({
//             status: '0',
//             msg: 'Error procesando operación.'
//         });
//     }
// };

// Realizar un pago mensual de alquiler
// propietarioCtrl.createPago = async (req, res) => {
//     try {
//         const propietarioId = req.params.id;
//         const { localId, metodoPago, descripcion, total } = req.body;
//         const fechaPago = new Date();

//         const pago = new Pago({ fechaPago, total, descripcion, metodoPago });

//         let alquiler = await Alquiler.findOne({ propietario: propietarioId, local: localId });

//         if (!alquiler) {
//             const local = await Local.findById(localId);
//             alquiler = new Alquiler({
//                 propietario: propietarioId,
//                 local: localId,
//                 pagoAlquiler: [pago],
//                 plazoMes: 1,
//                 fechaAlquiler: new Date(),
//                 costoAlquiler: local.costoMes
//             });
//         } else {
//             alquiler.pagoAlquiler.push(pago);
//         }

//         await alquiler.save();

//         res.status(201).json(alquiler);
//     } catch (error) {
//         res.status(500).json({
//             status: '0',
//             msg: 'Error procesando operación.'
//         });
//     }
// };
}
module.exports = propietarioCtrl;