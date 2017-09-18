var express = require('express');
var router = express.Router();


//Routes para el Menu Vertical

router.get('/perfil', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/perfil',{tipoUsuario: tipo});
  }
});

router.get('/perfil/editar/:id', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    res.render('user/editarPerfil');
  }
});

router.get('/archivos', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/archivos',{tipoUsuario: tipo});
  }
});

router.get('/horario', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/horario',{tipoUsuario: tipo});
  }
});

router.get('/agenda', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/agenda',{tipoUsuario: tipo});
  }
});

router.get('/aulas', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    res.render('user/mapaAulas'/*, { title: 'Express' }*/);
  }
});



router.get('/foro', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/foroGlobal',{tipoUsuario: tipo});
  }
});

router.get('/foro/estudiantes', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/foroEstudiantes',{tipoUsuario: tipo});
  }
});

router.get('/foro/docentes', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/foroDocentes',{tipoUsuario: tipo});
  }
});

router.get('/foro/ayudantes', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/foroAyudantes',{tipoUsuario: tipo});
  }
});

router.get('/foro/conversacion/:idForo', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var idForo = req.params.idForo;
    var tipo = req.session.rol;
    var mail = req.session.usuario.correo;
    res.render('user/foroContenido',{ idForo: idForo, tipoUsuario: tipo, correo: mail });
  }
});


router.get('/conectados', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('user/conectados',{ tipoUsuario: tipo });
  }
});



//Routes para el menu Principal/Horizontal

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

// Login and Logout

router.get('/login', function(req,res){
  sess = req.session;
  sess.email = req.body.email;
  //res.end('done');
  if(err) console.log(err);
  else res.redirect('/perfil');
});

router.get('/logout', function(req,res){
  var io = require('socket.io');
  var socket = io('localhost:3000');
  if (req.session) {
      socket.emit('LogoutEvent', req.session.usuario );
      req.session["rol"] = null;
      res.clearCookie();
      req.session.destroy(function() {});
  }
  res.redirect('/salir');
});

module.exports = router;