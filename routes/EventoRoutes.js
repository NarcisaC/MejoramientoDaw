var express = require('express');
var router = express.Router();
var EventoController = require('../controllers/EventoController.js');

/*
 * GET
 */
router.get('/', EventoController.list);

/*
 * GET
 */
router.get('/:id', EventoController.show);

/*
 * POST
 */
router.post('/', EventoController.create);

/*
 * PUT
 */
router.put('/:id', EventoController.update);

/*
 * DELETE
 */
router.delete('/:id', EventoController.remove);

module.exports = router;
