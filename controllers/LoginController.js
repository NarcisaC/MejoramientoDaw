var bcrypt = require('bcrypt-nodejs');

var AdminModel = require('../models/AdminModel.js');
var UserModel = require('../models/UserModel');
var ModeradorModel = require('../models/ModeradorModel.js');

module.exports = {

	login: function (req, res, next) {
		var correo = req.body.correo;
		var pass = req.body.password;

		var checkCorreo = ((correo == undefined) || (correo == ""));
		var checkPass = ((pass == undefined) || (pass == ""));
		// Falta correo o password
		if ( checkCorreo || checkPass ) {
		  return res.status(500).json({ message: "Credenciales inválidas" });
		}

		UserModel.findOne({correo: correo}, function (err, user){
			// Server error
			if (err) {
				return res.status(500).json({ message: "Error en el servidor" });
			}

			if (!user) {
				return res.status(404).json({ message:"Usuario no registrado" });
			}
					
			if (user) {
				if (!user.validPassword(pass)) {
				   	return res.status(404).json({ message:"Contraseña incorrecta" });
				}
				
				if (user.validPassword(pass)) {
				   	req.session["usuario"] = user;
					req.session["rol"] = user.tipoUsuario;
				    req.session["redirectTo"] = '/user/perfil';
				    req.session.save(function(err){
				    return res.status(200).json({ data: user, message:"Autenticado", url:'/user/perfil' });
					});
				}
			}
		});


	},  // end login


	// 
	logout: function (req, res, next) {
	    if (req.session) {
	        req.session["rol"] = null;
	        res.clearCookie('rol');
	        req.session.destroy(function() {});
	    }
	    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	    res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
	    res.redirect('/');
	}



}