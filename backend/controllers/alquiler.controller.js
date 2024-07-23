const Alquiler = require('../models/alquiler');
const Local = require('../models/local');
const Usuario = require('../models/usuario');
const Cuota = require('../models/cuota');
const Pago = require('../models/pago');
const alquilerCtrl = {}

const Rol = require('../models/rol');

// alquilerCtrl.getAlquileres = async (req, res) => { 
//     var alquileres = await Alquiler.find().populate(['usuario', 'local']);
//     res.json(alquileres);
// }

alquilerCtrl.getAlquileres = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario_id).populate('rol');
        const rolNombre = usuario.rol.nombre;
        var filter = (rolNombre == 'administrativo') ? {} : { usuario: req.usuario_id };
        const alquileres = await Alquiler.find(filter).populate(['usuario', 'local']);
        const alquileresConCuotas = [];
        for (let i = 0; i < alquileres.length; i++) {
            const alquiler = alquileres[i];
            const cuota = await Cuota.find({ alquiler: alquiler._id });
            alquileresConCuotas.push({
            alquiler,
            cuota
            });
        }
  
        res.json(alquileresConCuotas);
    } catch {
        res.status(500).json({
            'status': '0',
            'message': 'Error al obtener los locales'
        });
    }
}

alquilerCtrl.getAlquileresByPropietario = async (req, res) => {
    try {
        const alquileres = await Alquiler.find({ usuario: req.usuario_id }).populate(['usuario', 'local']);
        const alquileresConCuotasYPagos = [];
        for (let i = 0; i < alquileres.length; i++) {
            const alquiler = alquileres[i];
            const cuotas = await Cuota.find({ alquiler: alquiler._id });

            for (let j = 0; j < cuotas.length; j++) {
                const cuota = cuotas[j];
                const pago = await Pago.find({ cuota: cuota._id });
                alquileresConCuotasYPagos.push({
                    alquiler,
                    cuota,
                    pago
                });
            }
        }
  
        alquileresConCuotasYPagos.sort((a, b) => {
            if (a.cuota.anioPago === b.cuota.anioPago) {
                return b.cuota.mesPago - a.cuota.mesPago;
            } else {
                return b.cuota.anioPago - a.cuota.anioPago;
            }
        });

        res.json(alquileresConCuotasYPagos);
    } catch {
        res.status(500).json({
            'status': '0',
            'message': 'Error al obtener los locales'
        });
    }
}


alquilerCtrl.getAlquileresByUsuario = async (req, res) => {
    try {

        let filter = { usuario: req.usuario_id };
        const alquileres = await Alquiler.find(filter).populate(['usuario', 'local']);
        res.json(alquileres);
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'message': 'Error al obtener los locales'
        });
    }
};

alquilerCtrl.getAlquilerById = async (req, res) => {
    try {
        const alquiler = await Alquiler.findById(req.params.id).populate(['usuario', 'local']);
        if (!alquiler) {
            return res.status(404).json({ status: '0', msg: 'Alquiler no encontrado.' });
        }
        res.json(alquiler);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
    }
};


alquilerCtrl.createAlquiler = async (req, res) => {
    try {
        const local = await Local.findById({ _id: req.body.local._id });
        local.alquilado = true;

        let usuario = new Usuario();
        usuario = req.body.usuario;
        local.usuario = usuario;

        await local.save();
        var alquiler = new Alquiler(req.body)
        alquiler.local = local;
        await alquiler.save();
        res.json({
            'status': '1',
            'message': 'Se registró Alquiler'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'message': 'No se pudo registrar el alquiler'
        })
    }
}

alquilerCtrl.updateAlquiler = async (req, res) => {
    const valquiler = new Alquiler(req.body);
    try {
        await Alquiler.updateOne({ _id: req.body._id }, valquiler);
        res.json({
            'status': '1',
            'message': 'registro de Alquiler actualizado'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'message': 'Error, no se pudo actualizar el alquiler'
        })
    }
}

alquilerCtrl.deleteAlquiler = async (req, res) => {
    try {
        const alquiler = await Alquiler.findById(req.params.id);
        const local = await Local.findById({ _id: alquiler.local._id });
        local.alquilado = false;
        await local.save();
        await Alquiler.deleteOne({ _id: req.params.id });
        res.json({
            'status': '1',
            'message': 'Alquiler eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'message': 'Error. No se pudo eliminar el alquiler'
        })
    }
}

module.exports = alquilerCtrl;