var cloudinary = require('cloudinary');
var nodemailer = require('nodemailer');

var AdminModel = require('../models/AdminModel.js');
var ModeradorModel = require('../models/ModeradorModel.js');
var UserModel = require('../models/UserModel.js');


var config = require('../config/config.js');

/**
 * AdminController.js
 *
 * @description :: Server-side logic for managing Admins.
 */
module.exports = {

    /**
     * AdminController.list()
     */
    list: function (req, res) {
        AdminModel.find(function (err, Admins) {
            if (err) { return res.status(500).json({ message: 'Error al obtener los administradores', error: err }); }
            return res.json(Admins);
        });
    },


    /**
     * AdminController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        AdminModel.findOne({_id: id}, function (err, Admin) {
            if (err) { return res.status(500).json({ message: 'Error al obtener el administrador', error: err }); }
            if (!Admin) {
                return res.status(404).json({
                    message: 'Administrador no encontrado'
                });
            }
            return res.json(Admin);
        });
    },


    /**
     * AdminController.create()
     */
    create: function (req, res) {
        var Admin = new AdminModel({
			nombres : req.body.nombres,
			apellidos : req.body.apellidos,
            cedula : req.body.cedula,
			correo : req.body.correo,
			telefono : req.body.telefono,
			password : req.body.password
        });
        
        Admin.password = Admin.generateHash(req.body.password);
        
        ModeradorModel.findOne({correo: req.body.correo}, function (err, prev1){
            if (err) { return res.status(500).json({ message: 'Error al crear el administrador', error: err }); }
            if (prev1) {
                return res.status(500).json({message: "Ya existe un moderador con ese correo"});
            }
            else {
                UserModel.findOne({correo: req.body.correo}, function (err, prev2){
                    if (err) { return res.status(500).json({ message: 'Error al crear el administrador', error: err }); }
                    if (prev2) {
                        return res.status(500).json({message: "Ya existe un usuario con ese correo"});
                    }
                    else {
                        AdminModel.findOne({correo: req.body.correo}, function (err, prev3){
                            if (err) { return res.status(500).json({ message: 'Error al crear el administrador', error: err }); }
                            if (prev3) {
                                return res.status(500).json({message: "Ya existe un administrador con ese correo"});
                            }
                            else {
                                // No hay moderador, ni usuario, ni otro administrador con ese correo
                                Admin.save(function (err, Admin) {
                                    if (err) { return res.status(500).json({ message: 'Error al crear el administrador', error: err }); }
                                    return res.status(201).json(Admin);
                                });
                            }
                        });
                    }
                });
            }
        }); // **
    },


    /**
     * AdminController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        AdminModel.findOne({_id: id}, function (err, Admin) {
            if (err) { return res.status(500).json({ message: 'Error al obtener el administrador', error: err }); }

            if (!Admin) {
                return res.status(404).json({ message: 'Administrador no encontrado' });
            }

            if ( req.body.foto && req.body.foto!="" ) {
                cloudinary.uploader.upload(req.body.foto, function(result) {
                    if (result.url) {
                        Admin.nombres = req.body.nombres ? req.body.nombres : Admin.nombres;
                        Admin.apellidos = req.body.apellidos ? req.body.apellidos : Admin.apellidos;
                        Admin.cedula = req.body.cedula ? req.body.cedula : Admin.cedula;
                        Admin.correo = req.body.correo ? req.body.correo : Admin.correo;
                        Admin.foto = result.url;
                        Admin.telefono = req.body.telefono ? req.body.telefono : Admin.telefono;
                        Admin.password = req.body.password ? Admin.generateHash(req.body.password) : Admin.password;

                        Admin.save(function (err, Admin) {
                            if (err) { return res.status(500).json({ message: 'Error al actualizar el administrador', error: err }); }
                            return res.json(Admin);
                        });
                    }
                }); // cloudinary
            } 
            else {
                Admin.nombres = req.body.nombres ? req.body.nombres : Admin.nombres;
                Admin.apellidos = req.body.apellidos ? req.body.apellidos : Admin.apellidos;
                Admin.cedula = req.body.cedula ? req.body.cedula : Admin.cedula;
                Admin.correo = req.body.correo ? req.body.correo : Admin.correo;
                Admin.telefono = req.body.telefono ? req.body.telefono : Admin.telefono;
                Admin.password = req.body.password ? Admin.generateHash(req.body.password) : Admin.password;
                Admin.save(function (err, Admin) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error al actualizar el administrador', error: err
                        });
                    }
                    return res.json(Admin);
                });
            }

        });
    },


    /**
     * AdminController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        AdminModel.findByIdAndRemove(id, function (err, Admin) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al eliminar el administrador',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },



    getDataSession: function (req, res) {
        if ( req.session && req.session.usuario ) {
          var id = req.session.usuario._id;
          AdminModel.findOne({_id: id}, function (err, Admin){
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener los datos', error: err
                });
            }
            Admin.password = Admin.decryptHash(Admin.password);
            return res.status(200).json(Admin);
          });
        }
    },




    isAdmin: function (req, res) {
        if ( req.session && req.session.usuario ) {
          var id = req.session.usuario._id;
          AdminModel.findOne({_id: id}, function (err, Admin){
            if (err) { return res.status(500).json({ message: 'Error al obtener los datos', error: err }); }
            if (Admin) { return res.status(200).json({isAdmin: true}); }
            return res.status(200).json({isAdmin: false});
          });
        }
        else {
            return res.status(200).json({isAdmin: false});
        }
    },




    enviarCorreo: function (req, res) {
        var nombre = req.body.nombre;
        var remitente = req.body.remitente;
        var telefono = req.body.telefono;
        var mensaje = req.body.mensaje;

        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: config.myGmailMail,
            pass: config.myGmailPass
          }
        });
        var mailOptions = {
          from: config.myGmailMail,
          to: config.adminEmail,
          subject: 'Mensaje de la seccion "Contáctenos"',
          html: '<p>La persona <strong>'+nombre+'</strong> con correo <strong>'+remitente+'</strong> le ha enviado el siguiente mensaje:</p>'+
          '<p>"'+mensaje+'"</p>'+
          '<p>Adicionalmente, puede contactarse con el remitente llamando al teléfono <strong>'+telefono+'</strong></p>'+
          '<br>'+
          '<p>Posdata: <b>No responder al correo '+String(config.myGmailMail)+'</b> sino al correo que está indicado en la parte superior</p>'
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            return res.status(500).json({message: "Falló el envío"});
          } 
          else {
            return res.status(200).json({message: "Mensaje enviado"});
          }
        });
    }



};
