var cloudinary = require('cloudinary');
var RecursoModel = require('../models/RecursoModel.js');

/**
 * RecursoController.js
 *
 * @description :: Server-side logic for managing Recursos.
 */
module.exports = {

    /**
     * RecursoController.list()
     */
    list: function (req, res) {
        RecursoModel.find(function (err, Recursos) {
          if (err) { return res.status(500).json({ message: 'Error al obtener los recursos', error: err }); }
          return res.json(Recursos);
        });
    }, 



    disponibles: function (req, res) {
        RecursoModel.find({ forUsers: true },function (err, Recursos) {
          if (err) { return res.status(500).json({ message: 'Error al obtener los recursos', error: err }); }
          return res.json(Recursos);
        });
    }, 


    /**
     * RecursoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        RecursoModel.findOne({_id: id}, function (err, Recurso) {
          if (err) { return res.status(500).json({ message: 'Error al obtener el recurso', error: err }); }
          if (!Recurso) { return res.status(404).json({ message: 'Recurso no encontrado' }); }
          return res.json(Recurso);
        });
    },


    /**
     * RecursoController.create()
     */
    create: function (req, res) {
        if ( req.body.foto && req.body.foto!="" ) {
            cloudinary.uploader.upload(req.body.foto, function(result){
                if (result.url) {
                  var Recurso = new RecursoModel({
                    materia : req.body.materia,
                    descripcion: req.body.descripcion,
                    link : req.body.link,
                    foto : result.url
                  });
                  Recurso.save(function (err, Recurso) {
                    if (err) { return res.status(500).json({ message: 'Error al crear el recurso', error: err }); }
                    return res.status(201).json(Recurso);
                  });
                }
            });
        }
    },


    /**
     * RecursoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        RecursoModel.findOne({_id: id}, function (err, Recurso) {
            if (err) { return res.status(500).json({ message: 'Error al obtener el recurso', error: err }); }
            if (!Recurso) { return res.status(404).json({ message: 'Recurso no encontrado' }); }

            if ( req.body.foto && req.body.foto!="" ) {
                cloudinary.uploader.upload(req.body.foto, function(result){
                    if (result.url) {
                        Recurso.materia = req.body.materia ? req.body.materia : Recurso.materia;
                        Recurso.descripcion = req.body.descripcion ? req.body.descripcion : Recurso.descripcion;
                        Recurso.link = req.body.link ? req.body.link : Recurso.link;
                        Recurso.foto = result.url;
                        Recurso.fecha = req.body.fecha ? req.body.fecha : Recurso.fecha;
                        Recurso.forUsers = req.body.forUsers;
                        
                        Recurso.save(function (err, Recurso) {
                          if (err) { return res.status(500).json({ message: 'Error al actualizar el recurso', error: err }); }
                          return res.json(Recurso);
                        });
                    }
                });
            }
            else {
              Recurso.materia = req.body.materia ? req.body.materia : Recurso.materia;
              Recurso.descripcion = req.body.descripcion ? req.body.descripcion : Recurso.descripcion;
              Recurso.link = req.body.link ? req.body.link : Recurso.link;
              Recurso.fecha = req.body.fecha ? req.body.fecha : Recurso.fecha;
              Recurso.forUsers = req.body.forUsers;
              
              Recurso.save(function (err, Recurso) {
                if (err) { return res.status(500).json({ message: 'Error al actualizar el recurso', error: err }); }
                return res.json(Recurso);
              });
            }
        });
    },


    /**
     * RecursoController.remove()
     */
    remove: function (req, res) {
      var id = req.params.id;
      RecursoModel.findByIdAndRemove(id, function (err, Recurso) {
        if (err) { return res.status(500).json({ message: 'Error al eliminar el recurso', error: err }); }
        return res.status(204).json();
      });
    },



    enRango: function (req, res) {
      var campos = ["inicio", "fin"];
      for (var i=0; i<campos.length ; i++){
          var field = campos[i];
          if ( !req.body[field] || req.body[field] == null || req.body[field] == undefined || req.body[field]== '' ) {
            return res.status(500).json({ message: 'Faltan campos'});
          }
      }
        
      var fechaInicio = new Date(req.body.inicio);
      var fechaFin    = new Date(req.body.fin);

      // Sumamos 1 dia al final para que incluya la ultima fecha
      var fechaFin2 = new Date(
          fechaFin.getFullYear(), 
          fechaFin.getMonth(), 
          fechaFin.getDate()+1 
      );
      //  (fecha>=min) && (fecha<max)
      RecursoModel.find(
        {$and:
          [
            { 'fecha': {$gte: fechaInicio} },
            { 'fecha': {$lt: fechaFin2} }
          ]
        }
      )
      .sort({'fecha': 1})
      .exec(function(err, datos){
        if (err) {
          return res.status(500).json({ message: "Ocurrió un error al obtener los datos" });
        }
        // No encontrado
        if ( !datos ) {
          return res.status(404).json({ message: "No se encontraron datos" });
        }
        // Arreglo de zeros con la long de los dias
        var anioInicio  = fechaInicio.getFullYear();
        var anioFin     = fechaFin.getFullYear();
        var diferencia = anioFin - anioInicio + 1;
        var arregloAnios = []; // --> [ [10,8,..], [30,12,10,..], ... ]
        var labels = []; // --> ["2000","2001",...]

        for ( var i=0 ; i<diferencia ; i++ ) {
          labels.push( String(anioInicio+i) );
          var arrAnio = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);
          arregloAnios.push(arrAnio);
        }
        
        for ( var j=0 ; j<datos.length ; j++ ) {
          var fich_j = datos[j];
          var aniofich_j = new Date(fich_j.fecha).getFullYear();
          var mesfich_j  = new Date(fich_j.fecha).getMonth();
          var pos = labels.indexOf(String(aniofich_j));
          // Aumentamos esa posicion en el valor del dato (inicialmente era 0)
          arregloAnios[pos][mesfich_j] = arregloAnios[pos][mesfich_j] + 1;
        }
        return res.status(200).json({ series: labels, data: arregloAnios });
      });
    },




    porMaterias: function (req, res) {
        RecursoModel.find(function (err, Recursos) {
          if (err) { return res.status(500).json({ message: 'Error al obtener los recursos', error: err }); }
          if (Recursos.length<1) {
            var arr = [];
            var o = { key: "Ninguna materia", y: 0 }
            arr.push(o);
            return res.status(200).json(arr); 
          }
          else {
            var materias = [];
            var cantidades = [];
            var respuesta = [];
            for (var i = 0; i < Recursos.length; i++) {
              var rec = Recursos[i];
              if ( materias.indexOf(rec.materia)<0 ) {
                materias.push(rec.materia);
                cantidades.push(0);
              }
            }
            for (var j = 0; j < Recursos.length; j++) {
              var rec2 = Recursos[j];
              var index = materias.indexOf(rec2.materia);
              if ( index > -1 ) {
                cantidades[index] = cantidades[index]+1;
              }
            }
            for (var k = 0; k < materias.length; k++) {
              var mat = materias[k];
              var cant = cantidades[k];
              var obj = { key: mat, y: cant }
              respuesta.push(obj);
            }
            return res.status(200).json(respuesta);
          }
        });
    }


};
