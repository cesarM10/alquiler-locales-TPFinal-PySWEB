const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const usuarioCtrl = {};
const jwt = require('jsonwebtoken');
const Rol = require('../models/rol');


usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        let filter = { };

        if (req.query.apellido != null && req.query.apellido != '') {
            filter.apellido = { $regex: req.query.apellido, $options: 'i' };
        }

        if (req.query.dni != null && req.query.dni != 0) {
            filter.dni = req.query.dni;
        }

        if (req.query.rol != null && req.query.rol != '') {
            const rol = await Rol.findOne({ nombre: { $regex: req.query.rol, $options: 'i' } });
            if (rol) {
                filter.rol = rol._id;
            } else {
                return res.status(404).json({
                    'status': '0',
                    'message': 'Rol no encontrado'
                });
            }
        }

        // const rolDuenio = await Rol.findOne({ nombre: 'duenio' });
        // if (rolDuenio) {
        //     filter.rol = { $ne: rolDuenio._id };
        // }
        
        const usuarios = await Usuario.find(filter).populate("rol");
        res.json(usuarios);
       
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'message': 'Error al obtener los usuarios'
        });
    }
};

usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        const existeUsuario = await Usuario.findOne({ email: usuario.email });
        if (!existeUsuario) {
            const cifrado = await bcrypt.genSalt(5);
            usuario.password = await bcrypt.hash(usuario.password, cifrado);
            await usuario.save();
            res.status(201).json({
                'status': '1',
                'message': 'Usuario guardado.'
            });
        } else {
            res.status(200).json({
                'status': '0',
                'message': 'Usuario ya existente.'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'message': 'Error al guardar el usuario.'
        });
    }
};


usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).populate("rol");
        if (!usuario) {
            return res.status(404).json({
                'status': '0',
                'message': 'Usuario no encontrado'
            });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'message': 'Error al obtener el usuario'
        });
    }
};

usuarioCtrl.updateUsuario = async (req, res) => {
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUsuario) {
            return res.status(404).json({
                'status': '0',
                'message': 'Usuario no encontrado'
            });
        }
        res.json({
            'status': '1',
            'message': 'Usuario actualizado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'message': 'Error al actualizar el usuario'
        });
    }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!deletedUsuario) {
            return res.status(404).json({
                'status': '0',
                'message': 'Usuario no encontrado'
            });
        }
        res.json({
            'status': '1',
            'message': 'Usuario eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'message': 'Error al eliminar el usuario'
        });
    }
};

usuarioCtrl.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email }).populate('rol');
        if (!usuario) {
            return res.status(404).json({
                status: '0',
                message: 'Usuario no encontrado'
            });
        }

        const esContraseñaValida = await bcrypt.compare(password, usuario.password);
        if (!esContraseñaValida) {
            return res.status(401).json({
                status: '0',
                message: 'Contraseña inválida'
            });
        }

        res.json({
            status: '1',
            message: 'Inicio de sesión exitoso',
            token: createToken(usuario)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '0',
            message: 'Error al iniciar sesión'
        });
    }
};


function createToken(usuario) {
    const payload = {
        usuario_id: usuario._id,
        username: usuario.nombre + " " + usuario.apellido,
        usuario_rol: usuario.rol.nombre,
        usuario_email: usuario.email
    }

    return jwt.sign(payload, "secreto");
}

module.exports = usuarioCtrl;