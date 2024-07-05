const alquilerCtrl = require('../controller/alquiler-controller');

const express = require('express');
const router = express.Router();

router.get('/', alquilerCtrl.getAllAlquileres); // GET obtenerTodos
router.post('/', alquilerCtrl.createAlquiler); //POST crearAlquiler
router.put('/:id', alquilerCtrl.updateAlquiler); // PUT modifgicar
router.get('/:id', alquilerCtrl.getAllAlquilerId); //GET obtenerPor ID
router.delete('/:id', alquilerCtrl.deleteAlquiler);  // DELETE


// router.get('/:alquilado,:habilitado', alquilerCtrl.getAllLocal2parametros);


module.exports = router;