const express = require('express');
const router = express.Router();
const localCtrl = require('../controller/local-controller');

// Rutas para locales
router.get('/', localCtrl.getLocales);
router.post('/', localCtrl.createLocal);
router.get('/:id', localCtrl.getLocal);
router.put('/:id', localCtrl.editLocal);
router.delete('/:id', localCtrl.deleteLocal);

module.exports = router;
