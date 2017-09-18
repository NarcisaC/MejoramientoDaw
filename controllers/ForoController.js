var ForoModel = require('../models/ForoModel.js');

/**
 * ForoController.js
 *
 * @description :: Server-side logic for managing Foros.
 */
module.exports = {

    /**
     * ForoController.list()
     */
    list: function (req, res) {
        ForoModel.find(function (err, Foros) {
            if (err) { return res.status(500).json({ message: 'Error al obtener los foros', error: err }); }
            return res.json(Foros);
        });
    },


    /**
     * ForoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ForoModel.findOne({_id: id}, function (err, Foro) {
            if (err) { return res.status(500).json({ message: 'Error al obtener el foro', error: err }); }
            
            if (!Foro) { return res.status(404).json({ message: 'Foro no encontrado' }); }

            return res.json(Foro);
        });
    },


    /**
     * ForoController.create()
     */
    create: function (req, res) {
        var Foro = new ForoModel({
			categoria : req.body.categoria,
			propietario : req.session.usuario,
            titulo : req.body.titulo,
			contenido : req.body.contenido,
			comentarios : [],
            bloqueos: []
        });

        Foro.save(function (err, Foro) {
            if (err) { return res.status(500).json({ message: 'Error al crear el foro', error: err }); }
            return res.status(201).json(Foro);
        });
    },


    /**
     * ForoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ForoModel.findOne({_id: id}, function (err, Foro) {
            if (err) { return res.status(500).json({ message: 'Error al obtener el foro', error: err }); }
            
            if (!Foro) { return res.status(404).json({ message: 'Foro no encontrado' }); }

            Foro.categoria = req.body.categoria ? req.body.categoria : Foro.categoria;
            Foro.titulo = req.body.titulo ? req.body.titulo : Foro.titulo;
			Foro.contenido = req.body.contenido ? req.body.contenido : Foro.contenido;
			Foro.comentarios = req.body.comentarios ? req.body.comentarios : Foro.comentarios;
            Foro.bloqueos = req.body.bloqueos ? req.body.bloqueos : Foro.bloqueos;
			
            Foro.save(function (err, Foro) {
                if (err) { return res.status(500).json({ message: 'Error when updating Foro.', error: err }); }
                return res.json(Foro);
            });
        });
    },


    /**
     * ForoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ForoModel.findByIdAndRemove(id, function (err, Foro) {
            if (err) { return res.status(500).json({ message: 'Error when deleting the Foro.', error: err }); }
            return res.status(204).json();
        });
    },



    
    comentarForo: function (req, res) {
        var idForo = req.body.idForo;
        var comentario = {
            propietario: req.session.usuario,
            contenido: req.body.contenido
        }

        ForoModel.findByIdAndUpdate(
            idForo,
            { $push: {"comentarios": comentario } },
            { safe: true, upsert: true },
            function(err, foro) {
                if (err) { return res.status(500).json({ message: 'Error al comentar este foro', error: err }); }
                return res.status(200).json(foro);
            }
        );
    },




    eliminarComentario: function (req, res) {
      var idComentario = req.params.id;
      ForoModel.update(
        {  }, 
        { $pull: { "comentarios" : { _id: idComentario } } },
        { "multi" : true }
      ).exec(function (err, foro) {
        if (err) { return res.status(500).json({ message: 'Error al eliminar el comentario', error: err }); }
        return res.status(204).json();
      })
    },



    bloquear: function (req, res) {
        var idForo = req.body.idForo;
        var usuarioABloquear = {
            correo: req.body.usuario.correo,
            usuario: req.body.usuario
        };
        ForoModel.findByIdAndUpdate(
            idForo,
            { $push: {"bloqueos": usuarioABloquear } },
            { safe: true, upsert: true },
            function(err, foro) {
                if (err) { return res.status(500).json({ message: 'Error al bloquear al usuario', error: err }); }
                return res.status(200).json(foro);
            }
        );
    },




    desbloquear: function (req, res) {
      var mail = req.body.correo;
      var idForo = req.body.idForo;
      ForoModel.update(
        { _id: idForo }, 
        { $pull: { "bloqueos": { correo: mail } } },
        { "multi" : true }
      ).exec(function (err, foro) {
        if (err) { return res.status(500).json({ message: 'Error al eliminar el comentario', error: err }); }
        return res.status(204).json();
      })
    },




    byCategoria: function (req, res) {
        var tipo = req.params.tipo;
        ForoModel.find({ categoria: tipo }, function (err, Foros) {
            if (err) { return res.status(500).json({ message: 'Error al obtener los foros', error: err }); }
            return res.status(200).json(Foros);
        });
    }


};
