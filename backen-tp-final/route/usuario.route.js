const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controller/usuario.controller');
const authCtrl = require('../controller/auth.controller');

router.get('/usuario/registro', authCtrl.registerUser);
router.post('/usuario/login', authCtrl.loginUser);

router.get('/usuarios', authCtrl.verifyToken, usuarioCtrl.getUsuarios);
router.post('/usuario', authCtrl.verifyToken, usuarioCtrl.createUsuario);
router.get('/usuario/:id', authCtrl.verifyToken, usuarioCtrl.getUsuarioById);
router.put('/usuario/:id', authCtrl.verifyToken, usuarioCtrl.updateUsuario);
router.delete('/usuario/:id', authCtrl.verifyToken, usuarioCtrl.deleteUsuario);

module.exports = router;