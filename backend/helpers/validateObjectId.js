const mongoose = require('mongoose');

module.exports.validateObjectId = function (req, res, next, callback){
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'ID invalido' });
    }

    callback(req, res, next);
}