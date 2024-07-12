const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controller/usuario.controller');
const authCtrl = require('../controller/auth.controller');
const verifyRole = require('../middleware/roleMiddleware');

router.post('/refresh-token', authCtrl.refreshToken);
router.post('/registro', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);

router.get('/usuarios', verifyRole('dueño'), usuarioCtrl.getAllUsuarios);
router.post('/', verifyRole('dueño'), usuarioCtrl.createUsuario);
router.get('/:id', verifyRole('dueño'), usuarioCtrl.getUsuarioById);
router.put('/:id', verifyRole('dueño'), usuarioCtrl.updateUsuario);
router.delete('/:id', verifyRole('dueño'), usuarioCtrl.deleteUsuario);

router.get('/rol/:id', verifyRole('administrador'), usuarioCtrl.getRolUsuario);


module.exports = router;