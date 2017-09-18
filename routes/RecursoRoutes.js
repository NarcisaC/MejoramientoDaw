var express = require('express');
var router = express.Router();
var RecursoController = require('../controllers/RecursoController.js');

/*
 * GET
 */
router.get('/', RecursoController.list);
router.get('/ayudantes/disponibles', RecursoController.disponibles);
router.get('/estadisticas/materias', RecursoController.porMaterias);
/*
 * GET
 */
router.get('/:id', RecursoController.show);

/*
 * POST
 */
router.post('/', RecursoController.create);

/*
 * PUT
 */
router.put('/:id', RecursoController.update);

/*
 * DELETE
 */
router.delete('/:id', RecursoController.remove);



router.post('/rango/estadisticas', RecursoController.enRango)

module.exports = router;
