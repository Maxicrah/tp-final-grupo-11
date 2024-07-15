const mongoose = require('mongoose');
const Local = require('../model/local');
const Alquiler = require('../model/alquiler');
const { isValidObjectId } = require('mongoose');


const localCtrl={};


// Endpoint para obtener locales alquilados por propietario
localCtrl.getLocalesAlquiladosByProp = async (req, res) => {
    try {
        const { propietarioId } = req.params;
        const alquileres = await Alquiler.find({ propietario: propietarioId }).populate('local');
        const localesAlquilados = alquileres.map(alquiler => alquiler.local);

        res.status(200).json(localesAlquilados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los locales alquilados', error });
    }
};

localCtrl.getAllLocales = async (req, res)=>{
    try{
        const locales=await Local.find();
        res.json({data:locales});
        res.status(201) 
    }catch(error){
        res.status(400).json({message:error.message});
    }
}
localCtrl.getLocalesNoAlquilados = async (req, res) => {
    try {
        const locales = await Local.find({ alquilado: false });
        res.status(200).json({ data: locales });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

localCtrl.getLocalesHabilitados = async (req, res) => {
    try {
        const locales = await Local.find({ habilitado: true });
        res.status(200).json({ data: locales });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// localCtrl.alquilarLocal = async (req, res) => {
//     const id = req.params.id;
//     if (!id && !isValidObjectId(id)) {
//         return res.status(400).json({
//             status: '0',
//             message: 'El ID del Local no es válido'
//         });
//     }
//     try {
//         const local = await Local.findByIdAndUpdate(id, { alquilado: true }, { new: true });
//         if (!local) {
//             return res.status(404).json({
//                 status: '0',
//                 message: 'El Local no fue encontrado'
//             });
//         }
//         res.json({ data: local });
//     } catch (error) {
//         res.status(400).json({
//             status: '0',
//             message: 'Error procesando la operación'
//         });
//     }
// };

localCtrl.createLocal=async (req,res)=>{
    var local = new Local(req.body);
    try {
        console.log(req.body);
        //console.log(producto);
        await local.save();
        res.status(201).json(local); 
    }catch(error){
        res.status(400).json({
            status:'0',
            message:'Error Procesando la Operacion'
        });
    }
}

// Endpoint para alquilar un local
localCtrl.alquilarLocal =  async (req, res) => {
    try {
        const { localId, propietarioId, plazoMes, fechaAlquiler, costoAlquiler } = req.body;
        const nuevoAlquiler = new Alquiler({
            local: localId,
            propietario: propietarioId,
            plazoMes,
            fechaAlquiler,
            costoAlquiler
        });
        await nuevoAlquiler.save();
        
        // Actualizar el estado del local a 'alquilado'
        await Local.findByIdAndUpdate(localId, { alquilado: true });

        res.status(201).json(nuevoAlquiler);
    } catch (error) {
        res.status(500).json({ message: 'Error al alquilar el local', error });
    }
};


localCtrl.updateLocal=async(req,res)=>{
    const id = req.body._id;
    if(!id && !isValidObjectId(id)){
        return res.status(400).json({
            status:'0',
            message:'El ID del Local no es valido'
        });
    }
    try{
        const local = await Local.findbyIdAndUpdate(id,req.body,{new:true});
        if(!Local){
            return res.status(404).json({
                status:'0',
                message:'El Local no fue encontrado'
            });
        }
        res.json({data:local});
    } catch (error){
        res.status(400).json({
            status:'0',
            message:'Error Procesando la Operacion'
        });
    }
}
    localCtrl.getAllLocalId=async(req,res)=>{
        try{
            const local=await Local.findById(req.params.id);
            if(!local){
                return res.status(404).json({
                    status:'0',
                    message:'El Local no fue encontrado'
                });
            }
            res.json({data:local});
        }catch (error){
            resizeTo.status(400).json({
                status:'0',
                message:'Error Procesando la Operacion'
            });
        }
    }

localCtrl.deleteLocal=async(req,res)=>{
    const id = req.params.id;
    if(!id && isValidObjectId(id)){
        return res.status(400).json({
            status:'0',
            message:'El ID del Local no es valido'
        });
    }
    try {
        const local = await Local.findByIdAndDelete(id);
        if(!local){
            return res.status(404).json({
                status:'0',
                message:'El Local no fue encontrado'
            });
        }
        res.json({message:'Local eliminado correctamente'});
    }catch{
        res.status(400).json({
            status:'0',
            message:'Error Procesando la Operacion'
        });
    }
}

localCtrl.getAllLocal2parametros = async (req, res) => {
    var local = await Local.find({alquilado:req.params.alquilado,habilitado:req.params.habilitado});
    res.json(local);
    }



module.exports=localCtrl;
