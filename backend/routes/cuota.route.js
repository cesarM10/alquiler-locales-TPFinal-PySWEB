const express = require('express');
const router = express.Router();
const cuotaCtrl = require('../controllers/cuota.controller');

router.post('/', cuotaCtrl.createCuota);
router.get('/', cuotaCtrl.getCuotas);
router.get('/:id', cuotaCtrl.getCuotaById);
router.put('/:id', cuotaCtrl.updateCuota);
router.delete('/:id', cuotaCtrl.deleteCuota);

module.exports = router;