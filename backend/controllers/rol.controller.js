const Rol = require ('../models/rol');
const rolCtrl = {}

rolCtrl.getRoles = async (req, res) => {
    var roles = await Rol.find();
    res.json(roles);
}

rolCtrl.createRol = async (req, res) => {
    var rol = new Rol(req.body);
    try {
        await rol.save();
        res.json({
            'status': '1',
            'msg': 'Rol guardado.'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error al guardar el rol.'
        })
    }
}

rolCtrl.getRol = async (req, res) => {
    var rol = await Rol.findById(req.params.id);
    res.json(rol);
}

rolCtrl.updateRol = async (req, res) => {
    var vrol = new Rol (req.body);
    try{
        await Rol.updateOne({_id: req.body._id}, vrol);
        res.json({
            'status': '1',
            'msg': 'Rol actualizado.'
        });
    }catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error al actualizar el rol.'
        });
    }
}

rolCtrl.deleteRol = async (req, res) => {
    try {
        await Rol.deleteOne({_id: req.params.id});
        res.json({
            'status': '1',
            'msg': 'Rol eliminado.'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error al eliminar el rol.'
        });
    }
}

module.exports = rolCtrl;