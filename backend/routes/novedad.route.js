const novedadCtrl = require('../controllers/novedad.controller');
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/', novedadCtrl.createNovedad);
router.get('/', authCtrl.verifyToken,novedadCtrl.getNovedades);
router.get('/:id', novedadCtrl.getNovedadById);
router.put('/:id', novedadCtrl.updateNovedad);
router.delete('/:id', novedadCtrl.deleteNovedad);

module.exports = router;