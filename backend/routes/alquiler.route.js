const alquilerCtrl = require('../controllers/alquiler.controller')
const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();

router.get('/', authCtrl.verifyToken,alquilerCtrl.getAlquileres);
router.get('/propietario', authCtrl.verifyToken,alquilerCtrl.getAlquileresByPropietario);
router.get('/usuario', authCtrl.verifyToken, alquilerCtrl.getAlquileresByUsuario);
router.post('/', alquilerCtrl.createAlquiler);
router.get('/:id', alquilerCtrl.getAlquilerById);
router.put('/:id', alquilerCtrl.updateAlquiler);
router.delete('/:id', alquilerCtrl.deleteAlquiler);

module.exports = router;