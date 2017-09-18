var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RecursoSchema = new Schema({
	'materia' : { type: String, required: true },
	'descripcion' : { type: String, required: true },
	'link' : { type: String, required: true },
	'foto' : { type: String, required: true },
	'fecha' : { type: Date, default: Date.now },
	'forUsers' : { type: Boolean, default: true },
});

module.exports = mongoose.model('Recurso', RecursoSchema);
