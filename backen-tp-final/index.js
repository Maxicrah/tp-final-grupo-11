require('dotenv').config();
const Pago = require('./model/pago');
const pagoCtrl = require('./controller/pago-controller');
const express = require('express');
const cors = require('cors');

const connectToDatabase = require('./config/mongo.config');
const PORT = 3000;

connectToDatabase();
const app = express();
// SDK de Mercado Pago //Requerir MercadoPagoConfig y Preference
const { MercadoPagoConfig, Preference } = require('mercadopago');
const alquiler = require('./model/alquiler');
// Agrega credenciales //// Configura tus credenciales de acceso
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4973661379136227-070802-76dae679c5b74b901b687930b8eaa869-1892538886' });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
//ruta roles
app.use('/api/rol', require('./route/rol.route'));
//ruta usuarios
app.use('/api/usuario', require('./route/usuario.route'));
//ruta locales
app.use('/api/locales', require('./route/local.route'));
//ruta propietarios
app.use('/api/propietario', require('./route/propietario.route'));
//ruta administrativo
app.use('/api/administrativo', require('./route/administrativo.route'));
//ruta encargado
app.use('/api/encargado', require('./route/encargado.route'));
//ruta pagos
app.use('/api/pago', require('./route/pago.route'));
app.use('/api/local', require('./route/local.route'));
app.use('/api/alquiler',require('./route/alquiler.route'));

app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



//MERCADOPAGO
app.post("/create_preference",async (req,res)=>{
    
    try{
        const body ={
            items:[{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                currency_id: "ARS", //ESTA ES LA MONEDA que se quiere usar
                unit_price: Number(req.body.price),
                
            },],
            back_urls:{
                success: 'http://localhost:4200/listaAlquilerComponent',
                failure: 'https://www.facebook.com/',
                pending: 'https://www.linkedin.com/',
            },
            notification_url: 'https://e110-190-52-34-60.ngrok-free.app/webhook',
            auto_return:"approved", // con esta luego de 5 segundos te manda a alguna de las 3 opcionesAnteriores
        };
        const preference=new Preference(client);
        const result = await preference.create({body});
        res.json({id:result.id,

        });
   
       /// console.log("RESULTADO");
      ///  console.log(result);
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Error creando la preferencia"});
    };
});
//
/////////////////////////////
app.post('/webhook', async (req, res) => {
    console.log('INGRESO A WEBHOOK');
    const notification = req.body;

    if (notification.type === 'payment' && notification.data && notification.data.id) {
        const paymentId = notification.data.id;
        //const paymentId = notification;
        console.log('ES QUIEN TRAE LOS DATOS ? PAYMENT ID');
        console.log(paymentId); //veo todos los datos del pago
        
        // Llama a la API de Mercado Pago para obtener más detalles del pago
        const axios = require('axios');
        const accessToken = 'APP_USR-4973661379136227-070802-76dae679c5b74b901b687930b8eaa869-1892538886';

        axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(async response => {
            const paymentDetails = response.data;
            console.log(paymentDetails);
            const paymentStatus = paymentDetails.status;

            if (paymentStatus === 'approved') {
                console.log('Pago aprobado WEBHOOK');
                // Aquí puedes realizar acciones adicionales, como actualizar tu base de datos
                const body={fechaPago:new Date(),
                    total: paymentDetails.transaction_amount,
                    descripcion:"local alquilado",  //// paymentDetails.description,
                    metodoPago: paymentDetails.payment_method_id,
                    pagado:true,
                    //alquiler:req.body.alquilerId, // Este es el id del alquiler que se le paso como parametro en la peticion POST
                    alquiler:{_id:paymentDetails.description}
                }
                    var pago = new Pago(body);
                    console.log(body);
                    await pago.save();

                console.log(body);
            } else {
                console.log('Pago no aprobado, estado:', paymentStatus);
            }

            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error al obtener detalles del pago:', error);
            res.sendStatus(500);
        }); 
    } else {
        res.sendStatus(400);
    }
});


module.exports = { app, server };
