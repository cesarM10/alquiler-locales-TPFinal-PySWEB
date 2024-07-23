const Pago = require('../models/pago');
const pagoCtrl = {};

// Crear un nuevo pago
pagoCtrl.createPago = async (req, res) => {
  try {
    const pago = new Pago(req.body.pago);
    await pago.save();
    res.json({ status: '1', msg: 'Pago guardado.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Obtener todos los pagos
pagoCtrl.getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find();
    res.json(pagos);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Obtener un pago por ID
pagoCtrl.getPagoById = async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id);
    if (!pago) {
      return res.status(404).json({ status: '0', msg: 'Pago no encontrado.' });
    }
    res.json(pago);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Actualizar un pago por ID
pagoCtrl.updatePago = async (req, res) => {
  try {
    const pago = await Pago.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pago) {
      return res.status(404).json({ status: '0', msg: 'Pago no encontrado.' });
    }
    res.json({ status: '1', msg: 'Pago actualizado.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Eliminar un pago por ID
pagoCtrl.deletePago = async (req, res) => {
  try {
    const pago = await Pago.findByIdAndDelete(req.params.id);
    if (!pago) {
      return res.status(404).json({ status: '0', msg: 'Pago no encontrado.' });
    }
    res.json({ status: '1', msg: 'Pago eliminado.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

module.exports = pagoCtrl;