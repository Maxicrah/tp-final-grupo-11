const rolCtrl = require('../controller/rol.controller');

const express = require('express');
const router = express.Router();

router.get('/', rolCtrl.getAllRoles);
router.post('/', rolCtrl.createRol);
router.put('/:id', rolCtrl.updateRol);
router.get('/detalle/:id', rolCtrl.getAllRolId);
router.delete('/:id', rolCtrl.deleteRol);

module.exports = router;