const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controller/usuario.controller');
const authCtrl = require('../controller/auth.controller');

router.post('/registro', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);

router.get('/usuarios', usuarioCtrl.getAllUsuarios);
//router.post('/', usuarioCtrl.createUsuario);
router.get('/:id', usuarioCtrl.getUsuarioById);
router.put('/:id', usuarioCtrl.updateUsuario);
router.delete('/:id', usuarioCtrl.deleteUsuario);

module.exports = router;