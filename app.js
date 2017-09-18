/*//////////////////////
  Dependencias
//////////////////////*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cloudinary = require('cloudinary');
mongoose.Promise = global.Promise;



/*//////////////////////
  Rutas 
//////////////////////*/
var vistasRoutes    = require('./routes/index');
var LoginRoutes     = require('./routes/LoginRoutes.js');
var AdminRoutes     = require('./routes/AdminRoutes.js');
var ModeradorRoutes = require('./routes/ModeradorRoutes.js');
var UserRoutes      = require('./routes/UserRoutes.js');
var ForoRoutes      = require('./routes/ForoRoutes.js');
var RecursoRoutes   = require('./routes/RecursoRoutes.js');
var ayudantes       = require('./routes/ayudantes');
var user            = require('./routes/user');
var ManejoSesionRoutes = require('./routes/ManejoSesionRoutes.js');
var horarios        = require('./routes/citas.routes.js');
//var employees = require('./routes/employees');



/*//////////////////////////////
  Archivo de configuracion
//////////////////////////////*/
var config = require('./config/config.js');



var app = express();
var sess;
/*//////////////////////////////
  View engine setup
//////////////////////////////*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*//////////////////////////////
  Sesiones
//////////////////////////////*/
app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false
}));



/*//////////////////////////////
  Cloudinary (archivos)
//////////////////////////////*/
cloudinary.config({ 
  cloud_name: config.cloudinaryName, 
  api_key: config.cloudinaryAPI, 
  api_secret: config.cloudinarySecret 
});



/*//////////////////////////////
  Conexión con la BDD
//////////////////////////////*/
mongoose.connect(config.db, function(err){
  if(err){
    console.log('\nError: ' + err + '\n');
  }
  else {
  console.log('\nConectado con la base.\n');
  }
});


/*//////////////////////////////
  Definicion de las rutas
//////////////////////////////*/
app.use('/', ayudantes);
app.use('/user', user);
//app.use('/employees', employees);

// Rutas del api
app.use('/api/log', LoginRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/moderador', ModeradorRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/foro', ForoRoutes);
app.use('/api/recurso', RecursoRoutes);
app.use('/api', horarios);
app.use('/api/manejoSesiones', ManejoSesionRoutes);


/*////////////////////////////////////////////
  Catch 404 and forward to error handler
////////////////////////////////////////////*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



/*/////////////////////
  Error handler
/////////////////////*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    message: err.message,
    error: {}
  });
});


module.exports = app;
