const mongoose = require('mongoose');
const Local = require('../model/local');
const { isValidObjectId } = require('mongoose');
const localCtrl={};

localCtrl.getAllLocales = async (req, res)=>{
    try{
        const locales=await Local.find();
        res.json({data:locales});
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

localCtrl.createLocal=async (req,res)=>{
    var local = new Local(req.body);
    try {
        console.log(req.body);
        //console.log(producto);
        await local.save();
    }catch(error){
        res.status(400).json({
            status:'0',
            message:'Error Procesando la Operacion'
        });
    }
}

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
