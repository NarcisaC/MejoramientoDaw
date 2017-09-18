var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EventoSchema = new Schema({
	'imagen' : String,
	'fecha' : Date,
	'lugar' : String,
	'descripcion' : String
});

module.exports = mongoose.model('Evento', EventoSchema);
