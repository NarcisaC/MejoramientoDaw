var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ManejoSesionSchema = new Schema({
	'logueado' : Boolean,
	'usuario' : {
	  type: Schema.Types.ObjectId,
	  ref: "User"
	}
});

module.exports = mongoose.model('ManejoSesion', ManejoSesionSchema);
