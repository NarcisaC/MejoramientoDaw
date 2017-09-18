var EventoModel = require('../models/EventoModel.js');

/**
 * EventoController.js
 *
 * @description :: Server-side logic for managing Eventos.
 */
module.exports = {

    /**
     * EventoController.list()
     */
    list: function (req, res) {
        EventoModel.find(function (err, Eventos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Evento.',
                    error: err
                });
            }
            return res.json(Eventos);
        });
    },

    /**
     * EventoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        EventoModel.findOne({_id: id}, function (err, Evento) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Evento.',
                    error: err
                });
            }
            if (!Evento) {
                return res.status(404).json({
                    message: 'No such Evento'
                });
            }
            return res.json(Evento);
        });
    },

    /**
     * EventoController.create()
     */
    create: function (req, res) {
        var Evento = new EventoModel({
			imagen : req.body.imagen,
			fecha : req.body.fecha,
			lugar : req.body.lugar,
			descripcion : req.body.descripcion

        });

        Evento.save(function (err, Evento) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Evento',
                    error: err
                });
            }
            return res.status(201).json(Evento);
        });
    },

    /**
     * EventoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        EventoModel.findOne({_id: id}, function (err, Evento) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Evento',
                    error: err
                });
            }
            if (!Evento) {
                return res.status(404).json({
                    message: 'No such Evento'
                });
            }

            Evento.imagen = req.body.imagen ? req.body.imagen : Evento.imagen;
			Evento.fecha = req.body.fecha ? req.body.fecha : Evento.fecha;
			Evento.lugar = req.body.lugar ? req.body.lugar : Evento.lugar;
			Evento.descripcion = req.body.descripcion ? req.body.descripcion : Evento.descripcion;
			
            Evento.save(function (err, Evento) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Evento.',
                        error: err
                    });
                }

                return res.json(Evento);
            });
        });
    },

    /**
     * EventoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        EventoModel.findByIdAndRemove(id, function (err, Evento) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Evento.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
