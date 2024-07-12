const pagoCtrl = require('../controller/pago-controller');

const express = require('express');
const router = express.Router();


router.post('/', pagoCtrl.crearPago); //POST crearPago
router.get('/', pagoCtrl.getPago); // GET obtenerTodos
router.get('/pagos-realizados', pagoCtrl.getPagoTrue); //GET Recuperar los pagos realmente efectuados TRUE
router.put('/:id', pagoCtrl.editPago); // PUT modifgicarPAGO de true a false o viceversa
router.delete('/:id', pagoCtrl.deletePago);  // DELETE

//DE MERCADO PAGO
//router.post("/create-order",createOrder);
router.post('/create-order', pagoCtrl.createOrder); //POST crearPagoMercadoPago


//router.get ("/success",(req,res)=>res.send("success"));
//router.get ("/failure",(req,res)=>res.send("failure"));
//router.get ("/pending",(req,res)=>res.send("pending"));
//router.post ("/webhook",receiveWeenhook);

//router.get('/:alquilado,:habilitado', alquilerCtrl.getAllLocal2parametros);


module.exports = router;