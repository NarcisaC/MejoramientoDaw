var express = require('express');
var router = express.Router();
var AdminController = require('../controllers/AdminController.js');

/*
 * GET
 */
router.get('/', AdminController.list);

/*
 * GET
 */
router.get('/:id', AdminController.show);

/*
 * POST
 */
router.post('/', AdminController.create);

/*
 * PUT
 */
router.put('/:id', AdminController.update);

/*
 * DELETE
 */
router.delete('/:id', AdminController.remove);




router.get("/session/getData", AdminController.getDataSession);




router.get("/session/isAdmin", AdminController.isAdmin);




router.post("/correo/enviar", AdminController.enviarCorreo);

module.exports = router;
