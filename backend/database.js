const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/proyectoFinalPySW24';
mongoose.connect(URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))
module.exports = mongoose;