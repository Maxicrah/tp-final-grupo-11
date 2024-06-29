const Propietario = require('../model/propietario');
const propietarioCtrl = {}

propietarioCtrl.getAllPropietarios = async (req, res) => {
    try {
        const propietarios = await Propietario.find().populate('usuario');
        res.json({ data: propietarios });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
propietarioCtrl.createPropietario = async (req, res) => {
    const propietario = new Propietario(req.body);
    try {
        const newPropietario = await propietario.save();
        res.json({
            'status': '1',
            'msg': 'Propietario guardado.',
            data: newPropietario
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.',
            message: error.message
        })
    }
}

propietarioCtrl.getPropietarioById = async (req, res) => {
    try {
        const propietario = await Propietario.findById(req.params.id).populate('usuario');
        if(!propietario) {
            return res.status(404).json({
                status: '0',
                message: 'El propietario no fue encontrado.'
            });
        }
        res.json({ data: propietario });
    } catch (error) {
        res.status(500).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}
propietarioCtrl.updateProietario = async (req, res) => {
   try {
    const updatedPropietario = await Propietario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedPropietario) {
        return res.status(404).json({
            status: '0',
            message: 'El propietario no fue encontrado.'
        });
    }
    res.json({ data: updatedPropietario });
   } catch (error) {
    res.status(400).json({
        status: '0',
        message: 'Error procesando la operación. ' + error.message
    });
   }
}
propietarioCtrl.deletePropietario = async (req, res) => {
    try {
        const deletePropietario = await Propietario.deleteOne({ _id: req.params.id });
        if (!deletePropietario) return res.status(404).json({ message: 'El propietario no fue encontrado.' });
        res.json({
            status: '1',
            msg: 'El propietario ha sido eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        });
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