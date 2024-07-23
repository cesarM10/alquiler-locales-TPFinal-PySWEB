const localCtrl = require('../controllers/local.controller')
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');


router.get('/', authCtrl.verifyToken, localCtrl.getLocales);
router.get('/home', localCtrl.getLocalesPublicos);
router.post('/', localCtrl.createLocal);
router.get('/:id', localCtrl.getLocalById);
router.put('/:id', localCtrl.updateLocal);
router.delete('/:id', localCtrl.deleteLocal);

module.exports = router;

