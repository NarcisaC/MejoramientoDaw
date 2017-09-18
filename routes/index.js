var express = require('express');
var router = express.Router();



/*/////////// 
  Home page.
///////////*/
router.get('/', function(req, res, next) {
  if ( req.session && req.session.redirectTo  ) {
    res.redirect(req.session.redirectTo);
  }
  else {
    res.render('index');
  }
});



/*/////////// 
  Perfiles
///////////*/
router.get('/perfil', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol || req.session.rol!="usuario" ) {
    res.redirect("/");
  }
  else {
    res.render('perfil');
  }
});
router.get('/perfilAdmin', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol || req.session.rol!="admin" ) {
    res.redirect("/");
  }
  else {
    res.render('perfilAdmin');
  }
});
router.get('/perfilModerador', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol || req.session.rol!="moderador" ) {
    res.redirect("/");
  }
  else {
    res.render('perfilModerador');
  }
});



/*////////////////// 
  Editar Perfiles
//////////////////*/
router.get('/perfil/editarPerfil/:id', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol || req.session.rol!="usuario" ) {
    res.redirect("/");
  }
  else {
    res.render('editarPerfil');
  }
});
router.get('/perfilAdmin/editarPerfil/:id', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol || req.session.rol!="admin" ) {
    res.redirect("/");
  }
  else {
    res.render('editarPerfilAdmin');
  }
});
router.get('/perfilModerador/editarPerfil/:id', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol || req.session.rol!="moderador" ) {
    res.redirect("/");
  }
  else {
    res.render('editarPerfilModerador');
  }
});



/*////////////////// 
  Foros
//////////////////*/
router.get('/foroAyudantes', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('foroAyudantes',{tipoUsuario: tipo});
  }
});
router.get('/foroDocentes', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('foroDocentes',{tipoUsuario: tipo});
  }
});
router.get('/foroEstudiantes', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('foroEstudiantes',{tipoUsuario: tipo});
  }
});
router.get('/foroGlobal', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('foroGlobal',{tipoUsuario: tipo});
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
    res.render('foroContenido',{ idForo: idForo, tipoUsuario: tipo, correo: mail });
  }
});



/*////////////////// 
  Archivos
//////////////////*/
router.get('/archivosAdmin', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('archivosAdmin',{tipoUsuario: tipo});
  }
});
router.get('/archivosModerador', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('archivosModerador',{tipoUsuario: tipo});
  }
});
router.get('/archivos', function(req, res, next) {
  if ( !req.session || !req.session.usuario || !req.session.rol ) {
    res.redirect("/");
  }
  else {
    var tipo = req.session.rol;
    res.render('archivos',{tipoUsuario: tipo});
  }
});



/*////////////////// 
  Contacto
//////////////////*/
router.get('/contacto', function(req, res, next) {
  res.render('contacto');
});



router.get('/estadisticas', function(req, res, next) {
  res.render('estadisticas');
});



router.get('/horario', function(req, res, next) {
  res.render('horario');
});



/*////////////////// 
  Vista Login
//////////////////*/
router.get('/iniciaSesion', function(req, res, next) {
  if ( req.session && req.session.redirectTo  ) {
    res.redirect(req.session.redirectTo);
  }
  else {
    res.render('iniciaSesion');
  }
});



/*////////////////// 
  Vista registro
//////////////////*/
router.get('/registrate', function(req, res, next) {
  if ( req.session && req.session.redirectTo  ) {
    res.redirect(req.session.redirectTo);
  }
  else {
    res.render('registrate');
  }
});



/*////////////////// 
  Mapa
//////////////////*/
router.get('/mapa', function(req, res, next) {
  res.render('mapa');
});



/*////////////////// 
  Acerca de nosotros
//////////////////*/
router.get('/nosotros', function(req, res, next) {
  res.render('nosotros');
});



module.exports = router;
