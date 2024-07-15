const { isValidObjectId } = require('mongoose');
const Alquiler = require('../model/alquiler');
const alquilerCtrl = {};

alquilerCtrl.getAlquileres = async (req, res) => {
    try {
        const alquileres = await Alquiler.find().populate('propietario local pagoAlquiler');
        res.json(alquileres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

alquilerCtrl.getLocalesAlquiladosPorPropietario = async (req, res) => {
    try {
        const propietarioId = req.params.propietarioId;
        
        // Encuentra todos los alquileres para el propietario dado
        const alquileres = await Alquiler.find({ propietario: propietarioId }).populate('local');
        
        // Extrae los locales de los alquileres
        const localesAlquilados = alquileres.map(alquiler => alquiler.local);
        
        res.status(200).json(localesAlquilados);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los locales alquilados", error });
    }
};

// alquilerCtrl.getAllAlquileres = async (req, res) => {
//     try {
//         const alquileres = await Alquiler.find();
//         res.json({ data: alquileres });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

alquilerCtrl.createAlquiler = async (req, res) => {
    var alquiler = new Alquiler(req.body);
    try {
        console.log(req.body);
        //console.log(producto);
        await alquiler.save();
    }catch(error){
        res.status(400).json({
            status:'0',
            message:'Error Procesando la Operacion'
        });
    }


 /*   const Alquiler = new Alquiler(req.body);
    try {
        const newAlquiler = await Alquiler.create(Alquiler);
        res.json({ data: newAlquiler });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }*/
} 

alquilerCtrl.updateAlquiler = async (req, res) => {
    const id = req.body._id;
    if(!id && !isValidObjectId(id)) {
        return res.status(400).json({
            status: '0',
            message: 'El ID del Alquiler no es válido.'
        });
    }

    try {
        const alquiler = await Alquiler.findByIdAndUpdate(id, req.body, { new: true });
        if(!Alquiler) {
            return res.status(404).json({
                status: '0',
                message: 'El Alquiler no fue encontrado.'
            });
        }
        res.json({ data: alquiler });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.' 
        });
    }
}

alquilerCtrl.getAllAlquilerId = async (req, res) => {
    try {
        const alquiler = await Alquiler.findById(req.params.id);
        if(!alquiler) {
            return res.status(404).json({
                status: '0',
                message: 'El alquiler no fue encontrado.'
            });
        }
        res.json({ data: alquiler });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

alquilerCtrl.deleteAlquiler = async (req, res) => {
    const id = req.params.id;
    if(!id &&!isValidObjectId(id)) {
        return res.status(400).json({
            status: '0',
            message: 'El ID del alquiler no es válido.'
        });
    }

    try {
        const alquiler = await Alquiler.findByIdAndDelete(id);
        if(!alquiler) {
            return res.status(404).json({
                status: '0',
                message: 'El alquiler no fue encontrado.'
            });
        }
        res.json({ message: 'Alquiler eliminado correctamente.' });
    } catch {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
}

module.exports = alquilerCtrl;

