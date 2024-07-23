const express = require('express');
const router = express.Router();
const mercadopagoCtrl = require('../controllers/mercadopago.controller');

router.get('/payment/:id', mercadopagoCtrl.getPayment);
router.post('/create_preference', mercadopagoCtrl.createPreference);
router.post('/failure', mercadopagoCtrl.failure);
router.post('/pending', mercadopagoCtrl.pending);

module.exports = router;