const promocionCtrl = require('../controllers/promocion.controller');
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/', promocionCtrl.createPromocion);
router.get('/', authCtrl.verifyToken, promocionCtrl.getPromociones);
router.get('/home', promocionCtrl.getPromocionesPublicas);
router.get('/:id', promocionCtrl.getPromocionById);
router.put('/:id', promocionCtrl.updatePromocion);
router.delete('/:id', promocionCtrl.deletePromocion);

module.exports = router;