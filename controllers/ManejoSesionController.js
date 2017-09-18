var ManejoSesionModel = require('../models/ManejoSesionModel.js');



module.exports = {

    
    list: function (req, res) {
        ManejoSesionModel.find()
        .populate("usuario")
        .exec(function (err, ManejoSesions) {
            if (err) {
                return res.status(500).json({ message: 'Error when getting ManejoSesion.', error: err });
            }
            return res.json(ManejoSesions);
        });
    },



    show: function (req, res) {
        var id = req.params.id;
        ManejoSesionModel.findOne({_id: id}, function (err, ManejoSesion) {
            if (err) {
                return res.status(500).json({ message: 'Error when getting ManejoSesion.', error: err });
            }
            if (!ManejoSesion) {
                return res.status(404).json({ message: 'No such ManejoSesion' });
            }
            return res.json(ManejoSesion);
        });
    },

    

    create: function (req, res) {
        var ManejoSesion = new ManejoSesionModel({
			logueado : req.body.logueado,
			usuario : req.body.usuario
        });
        ManejoSesion.save(function (err, ManejoSesion) {
            if (err) {
                return res.status(500).json({ message: 'Error when creating ManejoSesion', error: err });
            }
            return res.status(201).json(ManejoSesion);
        });
    },

    

    update: function (req, res) {
        var id = req.params.id;
        ManejoSesionModel.update(
            { "usuario": id }, // query
            { logueado: req.body.logueado, usuario: req.body.usuario }, // update
            { upsert: true }, // Si no existe, lo crea
            function (err, ManejoSesion) {
            if (err) {
                return res.status(500).json({ message: 'Error when getting ManejoSesion', error: err });
            }
            return res.status(200).json({message: "Updated"});
        });
    },

    

    remove: function (req, res) {
        var id = req.params.id;
        ManejoSesionModel.remove(
            {"usuario._id": id}, // query
            function (err, ManejoSesion) {
            if (err) {
                return res.status(500).json({ message: 'Error when deleting the ManejoSesion.', error: err });
            }
            return res.status(204).json();
        });
    },



    removeAll: function (req, res) {
        ManejoSesionModel.update(
            {  },
            { logueado: false }, // update to false
            { upsert: true, multi: true }, // Si no existe, lo crea
            function (err, ManejoSesion) {
            if (err) {
              return res.status(500).json({ message: 'Error when getting ManejoSesion', error: err });
            }
            return res.status(200).json({message: "Updated"});
        });
    }



};
