var express = require('express');
var router = express.Router();
var ModeradorController = require('../controllers/ModeradorController.js');

/*
 * GET
 */
router.get('/', ModeradorController.list);

/*
 * GET
 */
router.get('/:id', ModeradorController.show);

/*
 * POST
 */
router.post('/', ModeradorController.create);

/*
 * PUT
 */
router.put('/:id', ModeradorController.update);

/*
 * DELETE
 */
router.delete('/:id', ModeradorController.remove);



router.get("/session/getData", ModeradorController.getDataSession);

module.exports = router;
