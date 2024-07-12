const { isValidObjectId } = require('mongoose');
const Pago = require('../model/pago');
const pagoCtrl = {}
//import mercadopago from "mercadopago";
//const  mercadopago  = require('mercadopago');
const { MercadoPagoConfig, Preference } = ('mercadopago');
//const { MercadoPagoConfig, Preference } = require ('mercadopago');
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-3794845851706295-070204-760ea1b8150d7ead36d0e0dd63b20c95-1881170271' });

//POST crear un Pago
pagoCtrl.crearPago=async(req,res)=>{
    var pago=new Pago(req.body);
    try{
        console.log(req.body);
        await pago.save();
        res.json({
            'status':'1',
            'msg':'Pago Guardado.'})
    }catch(error){
        res.status(400).json({
            'status':'0',
            'msg':'Error Procesando Operacion Pago.'})
    }
}

//GET Recuperar todos los pagos.
pagoCtrl.getPago=async(req,res)=>{
    var pagos =await Pago.find();
    res.json(pagos);
}

//GET Recuperar los pagos realmente efectuados TRUE
pagoCtrl.getPagoTrue=async(req,res)=>{
    var pagos=await Pago.find({pagado:true});
    res.json(pagos);
}

//PUT Cambiar de Estado un Pago "tue a false o false a true"
pagoCtrl.editPago=async(req,res)=>{
    let cambioEnPago=new Pago(req.body);
    try{
        await Pago.updateOne({_id:req.body._id},cambioEnPago);
        res.json({
            'status':'1',
            'msg':'Pago updated'
        })
    }catch (error){
        res.status(400).json({
            'status':'0',
            'msg':'Error Procesando el cambio en el Pago'
        })
    }
}

//ELimnar Pago
/**
pagoCtrl.deletePago=async(req,res)=>{
    const id=req.params.id;
    if(!id && !isValidObjectId(id)){
        return res.status(400).json({
            status:'0',
            message:'EL ID del Pago no es valido.'
        });
    }
    try{
        const pago = await Pago.findbyId(id);
        if(!pago){
            return res.status(404).json({
                status:'0',
                message:'El Pago no fue encontrado.'
            });
        }
        res.json({message:'Pago Eliminado Correctamente.'});
    }catch{
        res.status(400).json({
            status:'0',
            message:'Error procesando Elimnar Pago.'
        })
    }
}
**/
pagoCtrl.deletePago=async(req,res)=>{
    try{
        await Pago.deletePago({_id:req.params._id});
        res.json({
            status:'1',
            message:'Pago Eliminado Correctamente.'
        })
    }catch(error){
        res.status(400).json({
            status:'0',
            msg:'Error Procesando la eliminacion del Pago'
        })
    }
}

//METODOS MERCADO PAGO
//import mercadopago from "mercadopago";

//export const createOrder=(req,res)=>res.send('creating order');
/***
pagoCtrl.createOrder=async(req,res)=>{
    mercadopago.MercadoPagoConfig({
        access_token:
        "APP_USR-3794845851706295-070204-760ea1b8150d7ead36d0e0dd63b20c95-1881170271",
    });
    const result = await Preference.create({
        items:[
            {
                title: "Local 1",
                quantity: 1,
                currency_id: "ARS",
                unit_price: 100.0
            }
        ]
    })
    res.send('creating order');
};
*/

//const preference = new Preference.create(client);
const preference = new Preference(client);

        preference.create({
          body: {
            
            items: [
              {
                title: 'Local 1',
                quantity: 1,
                unit_price: 2000
              }
            ],
          }
        })
        .then(console.log)
        .catch(console.log);

module.exports = pagoCtrl;