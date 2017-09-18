var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
var codigoSecretoCrypto = 'ÉsteEsMiOtraClaveSecretaNoLeDiganANadieD:'

var UserSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    cedula: { type: String, required: true },
    matricula: { type: String, required: true },
    carrera: { type: String, required: true },
    telefono: { type: String, default: '' },
    foto: { type: String, default: '' },
    correo: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tipoUsuario: { 
      type: String, 
      enum:['admin','moderador','usuario'], 
      default: 'usuario'
    },
    redesSociales: {
      twitter: { type: String, default: '' },
      google: { type: String, default: '' },
      facebook: { type: String, default: '' },
      github: { type: String, default: '' }
    }
  },
  {
    versionKey: false,
    collection: 'user'
  }
);


// ====== Metodos ===========
UserSchema.methods.generateHash = function(password) {
  return CryptoJS.AES.encrypt(password, codigoSecretoCrypto);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  var oldbytes = CryptoJS.AES.decrypt(this.password, codigoSecretoCrypto);
  var oldPass = oldbytes.toString(CryptoJS.enc.Utf8);
  var check =  ( password === oldPass ? true : false );
  return check;
};

UserSchema.methods.decryptHash = function (token) {
  var bytes = CryptoJS.AES.decrypt(token, codigoSecretoCrypto);
  return bytes.toString(CryptoJS.enc.Utf8);
}


module.exports = mongoose.model('User', UserSchema);