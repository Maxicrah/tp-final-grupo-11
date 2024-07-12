const alquilerCtrl = require('../controller/alquiler-controller');

const express = require('express');
const router = express.Router();

router.get('/', alquilerCtrl.getAlquileres); // GET obtenerTodos
router.get('/propietario:_id', alquilerCtrl.getObtenerListaDeAlquilerPorPropietario); // GET obtenerTodos los alquileres por un propietario
router.post('/', alquilerCtrl.createAlquiler); //POST crearAlquiler
router.put('/:id', alquilerCtrl.updateAlquiler); // PUT modifgicar
router.get('/:id', alquilerCtrl.getAllAlquilerId); //GET obtenerPor ID
router.delete('/:id', alquilerCtrl.deleteAlquiler);  // DELETE


// router.get('/:alquilado,:habilitado', alquilerCtrl.getAllLocal2parametros);


module.exports = router;