var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index'/*, { title: 'Express' }*/);
});

router.get('/ayudantes/', function(req, res, next) {
  res.render('index'/*, { title: 'Express' }*/);
});

router.get('/ayudantes/nosotros', function(req, res, next) {
  res.render('ayudantes/nosotros'/*, { title: 'Express' }*/);
});

router.get('/ayudantes/contactos', function(req, res, next) {
  res.render('ayudantes/contacto'/*, { title: 'Express' }*/);
});

router.get('/ayudantes/estadisticas', function(req, res, next) {
  res.render('ayudantes/estadisticas'/*, { title: 'Express' }*/);
});

router.get('/ayudantes/mapa', function(req, res, next) {
  res.render('ayudantes/mapa'/*, { title: 'Express' }*/);
});

router.get('/ayudantes/login', function(req, res, next) {
  if ( req.session && req.session.redirectTo  ) {
    res.redirect(req.session.redirectTo);
  }
  else {
    res.render('ayudantes/iniciaSesion');
  }
});

router.get('/salir', function(req, res, next) {
  res.render('cerrarSesion'/*, { title: 'Express' }*/);
});




module.exports = router;
