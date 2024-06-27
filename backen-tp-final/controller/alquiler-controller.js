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

// alquilerCtrl.getAllAlquileres = async (req, res) => {
//     try {
//         const alquileres = await Alquiler.find();
//         res.json({ data: alquileres });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

alquilerCtrl.createAlquiler = async (req, res) => {
    const Alquiler = new Alquiler(req.body);
    try {
        const newAlquiler = await Alquiler.create(Alquiler);
        res.json({ data: newAlquiler });
    } catch (error) {
        res.status(400).json({
            status: '0',
            message: 'Error procesando la operación.'
        });
    }
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

