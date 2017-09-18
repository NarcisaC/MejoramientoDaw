var cloudinary = require('cloudinary');

var AdminModel = require('../models/AdminModel.js');
var ModeradorModel = require('../models/ModeradorModel.js');
var UserModel = require('../models/UserModel.js');

/**
 * ModeradorController.js
 *
 * @description :: Server-side logic for managing Moderadors.
 */
module.exports = {

    /**
     * ModeradorController.list()
     */
    list: function (req, res) {
        ModeradorModel.find(function (err, Moderadors) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener los moderadores',
                    error: err
                });
            }
            return res.json(Moderadors);
        });
    },


    /**
     * ModeradorController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ModeradorModel.findOne({_id: id}, function (err, Moderador) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener el moderador.',
                    error: err
                });
            }
            if (!Moderador) {
                return res.status(404).json({
                    message: 'Moderador no encontrado'
                });
            }
            return res.json(Moderador);
        });
    },


    /**
     * ModeradorController.create()
     */
    create: function (req, res) {
        var Moderador = new ModeradorModel({
			nombres : req.body.nombres,
			apellidos : req.body.apellidos,
			cedula : req.body.cedula,
			correo : req.body.correo,
            password : req.body.password,
			telefono : req.body.telefono
        });
        Moderador.password = Moderador.generateHash(req.body.password);

        AdminModel.findOne({correo: req.body.correo}, function (err, prev1){
            if (err) { return res.status(500).json({ message: 'Error al crear el moderador', error: err }); }
            if (prev1) {
                return res.status(500).json({message: "Ya existe un administrador con ese correo"});
            }
            else {
                UserModel.findOne({correo: req.body.correo}, function (err, prev2){
                    if (err) { return res.status(500).json({ message: 'Error al crear el moderador', error: err }); }
                    if (prev2) {
                        return res.status(500).json({message: "Ya existe un usuario con ese correo"});
                    }
                    else {
                        ModeradorModel.findOne({correo: req.body.correo}, function (err, prev3){
                            if (err) { return res.status(500).json({ message: 'Error al crear el moderador', error: err }); }
                            if (prev3) {
                                return res.status(500).json({message: "Ya existe un moderador con ese correo"});
                            }
                            else {
                                // No hay moderador, ni usuario, ni otro administrador con ese correo
                                Moderador.save(function (err, newModer) {
                                    if (err) { return res.status(500).json({ message: 'Error al crear el administrador', error: err }); }
                                    return res.status(201).json(newModer);
                                });
                            }
                        });
                    }
                });
            }
        }); // **
    },


    /**
     * ModeradorController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ModeradorModel.findOne({_id: id}, function (err, Moderador) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener el moderador',
                    error: err
                });
            }
            if (!Moderador) {
                return res.status(404).json({
                    message: 'Moderador no encontrado'
                });
            }

            if ( req.body.foto && req.body.foto!="" ) {
                cloudinary.uploader.upload(req.body.foto, function(result){
                    if (result.url) {
                        Moderador.nombres = req.body.nombres ? req.body.nombres : Moderador.nombres;
                        Moderador.apellidos = req.body.apellidos ? req.body.apellidos : Moderador.apellidos;
                        Moderador.cedula = req.body.cedula ? req.body.cedula : Moderador.cedula;
                        Moderador.foto = result.url;
                        Moderador.correo = req.body.correo ? req.body.correo : Moderador.correo;
                        Moderador.password = req.body.password ? Moderador.generateHash(req.body.password) : Moderador.password;
                        Moderador.telefono = req.body.telefono ? req.body.telefono : Moderador.telefono;
                        Moderador.redesSociales = req.body.redesSociales ? req.body.redesSociales : Moderador.redesSociales;

                        Moderador.save(function (err, Moderador) {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Error al actualizar el moderador.', error: err
                                });
                            }
                            return res.json(Moderador);
                        });
                    }
                });
            }
            else {
                Moderador.nombres = req.body.nombres ? req.body.nombres : Moderador.nombres;
                Moderador.apellidos = req.body.apellidos ? req.body.apellidos : Moderador.apellidos;
                Moderador.cedula = req.body.cedula ? req.body.cedula : Moderador.cedula;
                Moderador.correo = req.body.correo ? req.body.correo : Moderador.correo;
                Moderador.password = req.body.password ? Moderador.generateHash(req.body.password) : Moderador.password;
                Moderador.telefono = req.body.telefono ? req.body.telefono : Moderador.telefono;
                Moderador.redesSociales = req.body.redesSociales ? req.body.redesSociales : Moderador.redesSociales;
                
                Moderador.save(function (err, Moderador) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error al actualizar el moderador.', error: err
                        });
                    }
                    return res.json(Moderador);
                });
            }

        });
    },


    /**
     * ModeradorController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ModeradorModel.findByIdAndRemove(id, function (err, Moderador) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al eliminar el moderador.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },


    
    getDataSession: function (req, res) {
        if ( req.session && req.session.usuario ) {
          var id = req.session.usuario._id;
          ModeradorModel.findOne({_id: id}, function (err, Moderador){
            if (err) {
                return res.status(500).json({
                    message: 'Error al obtener los datos', error: err
                });
            }
            Moderador.password = Moderador.decryptHash(Moderador.password);
            return res.status(200).json(Moderador);
          });
        }
    }


};
