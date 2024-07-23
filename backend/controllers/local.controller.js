const Local = require('../models/local');
const localCtrl = {}
const Usuario = require('../models/usuario');

const Rol = require('../models/rol');
//Obtener todos los locales.Probado.
// localCtrl.getLocales = async (req, res) => {
//     var locales = await Local.find({ usuario: req.usuario_id });
//     res.json(locales);
// }

localCtrl.getLocales = async (req, res) => {
    try {
        let filter = {};
        const usuario = await Usuario.findById(req.usuario_id).populate('rol');
        const rolNombre = usuario.rol.nombre;
        if (rolNombre == 'duenio' || rolNombre == 'administrativo') {
            filter = {};
            if (req.query.habilitado != null) {
                filter.habilitado = req.query.habilitado === 'true';
            } else {

            }

            if (req.query.alquilado != null) {
                filter.alquilado = req.query.alquilado === 'true';
            } 

            const locales = await Local.find(filter).populate("usuario");
            res.json(locales);
        } else {
            // let filter = { usuario: req.usuario_id };
            filter = {};

            if (req.query.habilitado != null) {
                filter.habilitado = req.query.habilitado === 'true';
            } else {

            }

            if (req.query.alquilado != null) {
                filter.alquilado = req.query.alquilado === 'true';
            } else {
                filter = { usuario: req.usuario_id };
            }
            const locales = await Local.find(filter).populate("usuario");
            res.json(locales);
        }



    } catch (error) {
        res.status(500).json({
            'status': '0',
            'message': 'Error al obtener los locales'
        });
    }
};

localCtrl.getLocalesPublicos = async (req, res) => {
    try {

        let filter = {};
        filter.habilitado = 'true';
        filter.alquilado = 'false';

        const locales = await Local.find(filter);
        res.json(locales);
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'message': 'Error al obtener los locales'
        });
    }
};

//Obtener local por Id. Probado.
localCtrl.getLocalById = async (req, res) => {
    const local = await Local.findById(req.params.id);
    res.json(local);
}

//Crear local. Probado.
localCtrl.createLocal = async (req, res) => {
    try {
        const local = await Local.findOne({ numeroLocal: req.body.numeroLocal });
        if (local) {
            return res.json({
                'status': '0',
                'message': 'El local ya existe'
            })
        } else {
            const local1 = new Local(req.body);
            await local1.save();
            res.json({
                'status': '1',
                'message': 'Local creado'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'message': 'No se pudo guardar el local'
        })
    }
}

//Modificar un local. Probado.
localCtrl.updateLocal = async (req, res) => {
    const vlocal = new Local(req.body);
    try {
        await Local.updateOne({ _id: req.body._id }, vlocal);
        res.json({
            'status': '1',
            'message': 'registro de Local actualizado'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'message': 'Error, no se pudo actualizar el local'
        })
    }
}

//Eliminar un local. Probado.
localCtrl.deleteLocal = async (req, res) => {
    try {
        await Local.deleteOne({ _id: req.params.id });
        res.json({
            'status': '1',
            'message': 'Local eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'message': 'Error. No se pudo eliminar el local'
        })
    }
}

module.exports = localCtrl;