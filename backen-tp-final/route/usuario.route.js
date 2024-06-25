const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controller/usuario.controller');
const authCtrl = require('../controller/auth.controller');

router.get('/', authCtrl.verifyTokenAdmin ,usuarioCtrl.getAllUsuarios);
router.post('/', authCtrl.verifyTokenAdmin, usuarioCtrl.createUsuario);
router.get('/detalle/:id', authCtrl.verifyTokenAdmin, usuarioCtrl.getUsuarioById);
router.put('/:id', authCtrl.verifyTokenAdmin, usuarioCtrl.updateUsuario);
router.delete('/:id', authCtrl.verifyTokenAdmin, usuarioCtrl.deleteUsuario);

router.post('/login', usuarioCtrl.loginUsuario);

module.exports = router;