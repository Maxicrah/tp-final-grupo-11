const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controller/usuario.controller');
const authCtrl = require('../controller/auth.controller');

router.post('/registro', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);

router.get('/usuarios', authCtrl.verifyToken, usuarioCtrl.getAllUsuarios);
router.post('/', authCtrl.verifyToken, usuarioCtrl.createUsuario);
router.get('/:id', authCtrl.verifyToken, usuarioCtrl.getUsuarioById);
router.put('/:id', authCtrl.verifyToken, usuarioCtrl.updateUsuario);
router.delete('/:id', authCtrl.verifyToken, usuarioCtrl.deleteUsuario);

module.exports = router;