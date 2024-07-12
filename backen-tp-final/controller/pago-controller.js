const Pago = require('../model/pago');
const Local = require('../model/local');
const Alquiler = require('../model/alquiler');

const pagoCtrl = {};



//GET obtener pagos de un alquiler, pasando el ID de alquiler.
pagoCtrl.getObtenerPagosPorAlquiler=async (req,res)=>{
    var pagosPorAlquiler =await Pago.find({alquiler:req.params.id});
    res.json(pagosPorAlquiler);
}


// Ver pagos realizados por un propietario
pagoCtrl.getPagosByPropietario = async (req, res) => {
    try {
        const propietarioId = req.params.id;
        const alquileres = await Alquiler.find({ propietario: propietarioId }).populate('pagoAlquiler');
        const pagos = alquileres.flatMap(alquiler => alquiler.pagoAlquiler);
        res.json(pagos);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};


// Realizar un pago mensual de alquiler
pagoCtrl.createPago = async (req, res) => {
    try {
        /** const propietarioId = req.params.id;
        const { localId, metodoPago, descripcion, total } = req.body;
        const fechaPago = new Date();

        const pago = new Pago({ fechaPago, total, descripcion, metodoPago });

        let alquiler = await Alquiler.findOne({ propietario: propietarioId, local: localId }); 
        if (!alquiler) {
            const local = await Local.findById(localId);
            alquiler = new Alquiler({
                propietario: propietarioId,
                local: localId,
                pagoAlquiler: [pago],
                plazoMes: 1,
                fechaAlquiler: new Date(),
                costoAlquiler: local.costoMes
            });
        } else {
            alquiler.pagoAlquiler.push(pago);
        }
        await alquiler.save();
        res.status(201).json(alquiler);  **/
        var pago = new Pago(req.body);
        console.log(req,body);
        await pago.save();
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando operación Pago.'
        });
    }
};



module.exports = pagoCtrl;
