var mongoose = require('mongoose');
var CryptoJS = require("crypto-js");
var codigoSecretoCrypto = 'ÉsteEsMiOtraClaveSecretaNoLeDiganANadieD:'

var adminSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    cedula: { type: String, required: true },
    correo: { type: String, unique: true, required: true },
    telefono: { type: String, default: '' },
    foto: { type: String, default: '' },
    password: { type: String, required: true }
  },
  {
    versionKey: false,
    collection: 'admin'
  }
);


// ====== Metodos ===========
adminSchema.methods.generateHash = function(password) {
  return CryptoJS.AES.encrypt(password, codigoSecretoCrypto);
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
  var oldbytes = CryptoJS.AES.decrypt(this.password, codigoSecretoCrypto);
  var oldPass = oldbytes.toString(CryptoJS.enc.Utf8);
  var check =  ( password === oldPass ? true : false );
  return check;
};

adminSchema.methods.decryptHash = function (token) {
  var bytes = CryptoJS.AES.decrypt(token, codigoSecretoCrypto);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = mongoose.model('Admin', adminSchema);
