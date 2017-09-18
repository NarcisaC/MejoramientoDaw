var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Solo los administradores crean foros*

var ForoSchema = new Schema({
  'categoria': { 
  	type: String, 
  	enum: ['Estudiantes','Docentes','Ayudantes'], 
  	default: 'Publico',
  	required: true
  },
  'propietario': { 
  	type: Object, 
  	required: true 
  },
  'fechaCreacion': { 
  	type: Date, 
  	default: Date.now 
  },
  'titulo': { 
    type: String, 
    maxlength:[100, "Solo se permiten hasta 100 caracteres"],
    required: true
  },
  'contenido': { 
  	type: String, 
  	maxlength:[500, "Solo se permiten hasta 500 caracteres"],
  	required: true
  },
  'comentarios': [{
	    'propietario': { type: Object },
      'fechaComentario': { type: Date, default: Date.now },
      'contenido': { type: String, maxlength:[160, "Solo se permiten hasta 160 caracteres"] }
  }],
  'bloqueos':[{
      'correo': { type: String },
      'usuario': { type: Object }
  }]

});

module.exports = mongoose.model('Foro', ForoSchema);
