var express = require('express');
var router = express.Router();
var ManejoSesionController = require('../controllers/ManejoSesionController.js');

/*
 * GET
 */
router.get('/', ManejoSesionController.list);

/*
 * GET
 */
router.get('/:id', ManejoSesionController.show);

/*
 * POST
 */
router.post('/', ManejoSesionController.create);

/*
 * PUT
 */
router.put('/:id', ManejoSesionController.update);

/*
 * DELETE
 */
router.delete('/:id', ManejoSesionController.remove);



router.post('/limpiar/all', ManejoSesionController.removeAll);

module.exports = router;
