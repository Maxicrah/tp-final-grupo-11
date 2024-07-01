const localCtrl = require('../controller/local.controller');

const express = require('express');
const router = express.Router();

router.get('/', localCtrl.getAllLocales);
router.post('/', localCtrl.createLocal);
router.put('/:id', localCtrl.updateLocal);
router.get('/detalle/:id', localCtrl.getAllLocalId);
router.delete('/:id', localCtrl.deleteLocal);
router.get('/:alquilado,:habilitado', localCtrl.getAllLocal2parametros);


module.exports = router;