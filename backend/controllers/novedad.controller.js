const Novedad = require('../models/novedad');
const novedadCtrl = {};

const Usuario = require('../models/usuario');
const Rol = require('../models/rol');


// Crear una nueva novedad
novedadCtrl.createNovedad = async (req, res) => {
  try {
    const novedad = new Novedad(req.body);
    await novedad.save();
    res.json({ status: '1', msg: 'Novedad guardada.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Obtener todas las novedades

// novedadCtrl.getNovedades = async (req, res) => {
//   try {
//     const novedades = await Novedad.find({ usuario: req.usuario_id }).populate(['local', 'usuario']);
//     res.json(novedades);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
//   }
// };

// novedadCtrl.getNovedades = async (req, res) => {
//   try {

//     //let filter = {};

//     let filter = { usuario: req.usuario_id };

//     if (req.query.estado != null && req.query.estado != '') {
//       filter.estado = req.query.estado;
//     }

//     const novedades = await Novedad.find(filter).populate({
//       path: 'local',
//       populate: { path: 'usuario' }
//     })
//     .populate('usuario');

//     res.json(novedades);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
//   }
// };
novedadCtrl.getNovedades = async (req, res) => {
  try {
    let filter = {};
    const usuario = await Usuario.findById(req.usuario_id).populate('rol');
    const rolNombre = usuario.rol.nombre;
    if (rolNombre == 'administrativo' || rolNombre == 'duenio') {
        filter = {};
    } else {
        filter = { usuario: req.usuario_id };
        
      if (req.query.estado != null && req.query.estado != '') {
        filter.estado = req.query.estado;
      }

    }
    const novedades = await Novedad.find(filter).populate(['local', 'usuario']);
    res.json(novedades);
  } catch {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
}

// Obtener una novedad por ID
novedadCtrl.getNovedadById = async (req, res) => {
  try {
    const novedad = await Novedad.findById(req.params.id).populate(['local', 'usuario']);
    if (!novedad) {
      return res.status(404).json({ status: '0', msg: 'Novedad no encontrada.' });
    }
    res.json(novedad);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Actualizar una novedad por ID
novedadCtrl.updateNovedad = async (req, res) => {
  try {
    const novedad = await Novedad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!novedad) {
      return res.status(404).json({ status: '0', msg: 'Novedad no encontrada.' });
    }
    res.json({ status: '1', msg: 'Novedad actualizada.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

// Eliminar una novedad por ID
novedadCtrl.deleteNovedad = async (req, res) => {
  try {
    const novedad = await Novedad.findByIdAndDelete(req.params.id);
    if (!novedad) {
      return res.status(404).json({ status: '0', msg: 'Novedad no encontrada.' });
    }
    res.json({ status: '1', msg: 'Novedad eliminada.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
  }
};

module.exports = novedadCtrl;