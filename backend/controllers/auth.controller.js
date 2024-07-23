const jwt = require('jsonwebtoken');

const authCtrl = {};

authCtrl.verifyToken = async (req, res, next) => {
    if (!req.headers.authorization){
        res.status(200).json({'status': '0', 'message': 'Unauthorized request.'});
    }else{
        var arrayTexto = req.headers.authorization.split(' ');
        var token = (arrayTexto.length >= 2)? arrayTexto[1] : null;

        if(token == null){
            res.json({'status': '0', 'message': 'Unauthorized request.'});
        }else{
            try{
                const payload = jwt.verify(token, 'secreto');
                req.usuario_id = payload.usuario_id;
                next();
            }catch(error){
                res.json({'status': '0', 'message': 'Unauthorized request.'});
            }
        }
    }
}

module.exports = authCtrl;