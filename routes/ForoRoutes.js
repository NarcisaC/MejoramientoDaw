var express = require('express');
var router = express.Router();
var ForoController = require('../controllers/ForoController.js');

/*
 * GET
 */
router.get('/', ForoController.list);

/*
 * GET
 */
router.get('/:id', ForoController.show);

/*
 * POST
 */
router.post('/', ForoController.create);

/*
 * PUT
 */
router.put('/:id', ForoController.update);

/*
 * DELETE
 */
router.delete('/:id', ForoController.remove);




router.post('/comentarios/nuevo', ForoController.comentarForo);
router.delete('/comentarios/eliminar/:id', ForoController.eliminarComentario);


router.post('/bloqueos/nuevo', ForoController.bloquear);
router.post('/bloqueos/eliminar', ForoController.desbloquear);



router.get('/categoria/:tipo', ForoController.byCategoria);


module.exports = router;
