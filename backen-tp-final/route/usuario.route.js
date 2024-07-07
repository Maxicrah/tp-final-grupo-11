const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controller/usuario.controller');
const authCtrl = require('../controller/auth.controller');

router.post('/registro', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);

<<<<<<< HEAD
router.get('/usuarios', authCtrl.verifyToken, usuarioCtrl.getUsuarios);
router.post('/usuario', authCtrl.verifyToken, usuarioCtrl.createUsuario);
router.get('/usuario/:id', authCtrl.verifyToken, usuarioCtrl.getUsuarioById);
router.put('/usuario/:id', authCtrl.verifyToken, usuarioCtrl.updateUsuario);
router.delete('/usuario/:id', authCtrl.verifyToken, usuarioCtrl.deleteUsuario);
=======
router.get('/usuarios', usuarioCtrl.getAllUsuarios);
//router.post('/', usuarioCtrl.createUsuario);
router.get('/:id', usuarioCtrl.getUsuarioById);
router.put('/:id', usuarioCtrl.updateUsuario);
router.delete('/:id', usuarioCtrl.deleteUsuario);
>>>>>>> develop

module.exports = router;