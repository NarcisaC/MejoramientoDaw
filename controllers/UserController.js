var cloudinary = require('cloudinary');

var AdminModel = require('../models/AdminModel.js');
var ModeradorModel = require('../models/ModeradorModel.js');
var UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener a los usuarios',
                    error: err
                });
            }
            return res.json(Users);
        });
    },


    /**
     * UserController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener el usuario',
                    error: err
                });
            }
            if (!User) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
            return res.json(User);
        });
    },


    /**
     * UserController.create()
     */
    create: function (req, res) {
        var User = new UserModel({
			nombres : req.body.nombres,
			apellidos : req.body.apellidos,
            cedula : req.body.cedula,
            matricula : req.body.matricula,
            carrera : req.body.carrera,
            telefono : req.body.telefono,
			correo : req.body.correo,
			password : req.body.password
        });

        if (req.body.tipoUsuario) {
          User.tipoUsuario = req.body.tipoUsuario;
        }

        User.password = User.generateHash(req.body.password);
        
        UserModel.findOne({correo: req.body.correo}, function (err, prev3){
            if (err) { return res.status(500).json({ message: 'Error al crear el usuario', error: err }); }
            if (prev3) {
                return res.status(500).json({message: "Ya existe un "+prev3.tipoUsuario+" con ese correo"});
            }
            else {
                User.save(function (err, newUser) {
                    if (err) { return res.status(500).json({ message: 'Error al crear el administrador', error: err }); }
                    return res.status(201).json(newUser);
                });
            }
        });
    },


    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UserModel.findOne({_id: id}, function (err, User) {
            if (err) { return res.status(500).json({ message: 'Error al obtener el usuario', error: err }); }
            if (!User) { return res.status(404).json({ message: 'Usuario no encontrado' }); }
            if ( req.body.foto && req.body.foto!="" ) {
                cloudinary.uploader.upload(req.body.foto, function(result){
                    if (result.url) {
                        User.nombres = req.body.nombres ? req.body.nombres : User.nombres;
                        User.apellidos = req.body.apellidos ? req.body.apellidos : User.apellidos;
                        User.cedula = req.body.cedula ? req.body.cedula : User.cedula;
                        User.matricula = req.body.matricula ? req.body.matricula : User.matricula;
                        User.carrera = req.body.carrera ? req.body.carrera : User.carrera;
                        User.telefono = req.body.telefono ? req.body.telefono : User.telefono;
                        User.foto = result.url;
                        User.tipoUsuario = req.body.tipoUsuario ? req.body.tipoUsuario : User.tipoUsuario;
                        User.correo = req.body.correo ? req.body.correo : User.correo;
                        User.password = req.body.password ? User.generateHash(req.body.password) : User.password;
                        User.redesSociales = req.body.redesSociales ? req.body.redesSociales : User.redesSociales;

                        User.save(function (err, user) {
                            if (err) { return res.status(500).json({ message: 'Error al actualizar el usuario', error: err }); }
                            return res.status(200).json(user);
                        });
                    }
                });
            }
            else {
                User.nombres = req.body.nombres ? req.body.nombres : User.nombres;
                User.apellidos = req.body.apellidos ? req.body.apellidos : User.apellidos;
                User.cedula = req.body.cedula ? req.body.cedula : User.cedula;
                User.matricula = req.body.matricula ? req.body.matricula : User.matricula;
                User.carrera = req.body.carrera ? req.body.carrera : User.carrera;
                User.telefono = req.body.telefono ? req.body.telefono : User.telefono;
                User.correo = req.body.correo ? req.body.correo : User.correo;
                User.tipoUsuario = req.body.tipoUsuario ? req.body.tipoUsuario : User.tipoUsuario;
                User.password = req.body.password ? User.generateHash(req.body.password) : User.password;
                User.redesSociales = req.body.redesSociales ? req.body.redesSociales : User.redesSociales;
                
                User.save(function (err, user) {
                    if (err) { return res.status(500).json({ message: 'Error al actualizar el usuario', error: err }); }
                    return res.status(200).json(user);
                });
            }
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al eliminar el usuario',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },


    

    getDataSession: function (req, res) {
        if ( req.session && req.session.usuario ) {
          var id = req.session.usuario._id;
          UserModel.findOne({_id: id}, function (err, User){
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener los datos', error: err
                });
            }
            User.password = User.decryptHash(User.password);
            return res.status(200).json(User);
          });
        }
    },



    isLogged: function (req, res) {
        if ( req.session && req.session.usuario && req.session.rol && req.session.redirectTo ) {
          return res.status(200).json();
        }
        else {
          return res.status(503).json({ message:"No autenticado"});
        }
    }


};
