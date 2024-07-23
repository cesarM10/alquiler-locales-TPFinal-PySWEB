const pagoCtrl = require('../controllers/pago.controller');
const express = require('express');
const router = express.Router();

router.post('/', pagoCtrl.createPago);
router.get('/', pagoCtrl.getPagos);
router.get('/:id', pagoCtrl.getPagoById);
router.put('/:id', pagoCtrl.updatePago);
router.delete('/:id', pagoCtrl.deletePago);

module.exports = router;