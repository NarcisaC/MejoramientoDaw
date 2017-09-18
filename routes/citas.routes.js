var express = require('express');
var router = express.Router();

var cita = require('../controllers/citas.controllers');


router.route('/cita')
    .get(cita.listCitas)
    .post(cita.createCita);
  
router.route('/cita/:citaId')
    .delete(cita.eliminarCita);

router.route('/cancelarCitaPaciente/:citaId')
  	.put(cita.cancelarCita);

router.route('/reservarCita/:citaId')
    .put(cita.reservarCita);


module.exports = router;