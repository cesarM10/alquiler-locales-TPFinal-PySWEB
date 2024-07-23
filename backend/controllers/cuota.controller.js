const Cuota = require('../models/cuota');
const cuotaCtrl = {};

// Crear una nueva cuota
cuotaCtrl.createCuota = async (req, res) => {
  try {
    const cuotaExiste = await Cuota.findOne({idMercadoPago: req.body.cuota.idMercadoPago});
    if (cuotaExiste){
      res.status(400).json({ status: '0', msg: "La cuota ya ha sido pagada."});
    }else{
      const cuota = new Cuota(req.body.cuota);
      const save = await cuota.save();
      res.json({ status: '1', msg: 'Cuota guardada.', cuotaId: save._id });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Obtener todas las cuotas
cuotaCtrl.getCuotas = async (req, res) => {
  try {
    const cuotas = await Cuota.find();
    res.json(cuotas);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Obtener una cuota por ID
cuotaCtrl.getCuotaById = async (req, res) => {
  try {
    const cuota = await Cuota.findById(req.params.id);
    if (!cuota) {
      return res.status(404).json({ status: '0', msg: 'Cuota no encontrada.' });
    }
    res.json(cuota);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Actualizar una cuota por ID
cuotaCtrl.updateCuota = async (req, res) => {
  try {
    const cuota = await Cuota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cuota) {
      return res.status(404).json({ status: '0', msg: 'Cuota no encontrada.' });
    }
    res.json({ status: '1', msg: 'Cuota actualizada.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Eliminar una cuota por ID
cuotaCtrl.deleteCuota = async (req, res) => {
  try {
    const cuota = await Cuota.findByIdAndDelete(req.params.id);
    if (!cuota) {
      return res.status(404).json({ status: '0', msg: 'Cuota no encontrada.' });
    }
    res.json({ status: '1', msg: 'Cuota eliminada.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

module.exports = cuotaCtrl;