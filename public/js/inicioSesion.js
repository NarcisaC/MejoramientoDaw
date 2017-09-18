angular.module('myApp',['angular-loading-bar'])



.controller('ContactoCtrl', function($scope, $http){
    $scope.initForm = function () {
        $scope.nombre = "";
        $scope.email = "";
        $scope.telefono = "";
        $scope.mensaje = "";
    }

    $scope.initForm();

    $scope.enviarCorreo = function () {
        var datos = {
            nombre: $scope.nombre,
            remitente: $scope.email,
            telefono: $scope.telefono,
            mensaje: $scope.mensaje
        }
        $http({
          method: 'POST',
          url: '/api/admin/correo/enviar',
          data: datos
        })
        .then(
          function (response){
            $scope.initForm();
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_SUCCESS,
                title: 'Exito',
                closable: false,
                message: "Mensaje enviado",
                buttons: [{
                  label: 'Cerrar',
                  action: function (dialogItself) { 
                    dialogItself.close(); 
                  }
                }]
            }); 
          },
          function (errorResponse){
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Error',
                closable: false,
                message: "Mensaje no enviado",
                buttons: [{
                  label: 'Cerrar',
                  action: function (dialogItself) { 
                    dialogItself.close(); 
                  }
                }]
            }); 
          }
        );
    }

})



.controller('LoginController', function($scope, $http, $window){
	$scope.user = {}
	$scope.user.correo = "";
	$scope.user.password = "";
	$scope.typeInput = 'password';

	$scope.iniciarSesion = function(){
		$http({
            method: 'POST',
            url: '/api/log/in',
            data: $scope.user
        })
        .then(
        	function(response){
            	$window.location.href = response.data.url;
          	},
          	function(errorResponse){
          		console.log(errorResponse.data.message);
	            BootstrapDialog.show({
	                type: BootstrapDialog.TYPE_DANGER,
	                title: 'Error',
	                closable: false,
	                message: errorResponse.data.message,
	                buttons: [{
	                    label: 'Cerrar',
	                    action: function (dialogItself) { 
	                    	dialogItself.close(); 
	                    }
	                }]
	            }); 
            }
        );
    } // iniciarSesion

    
    $scope.changeType = function () {
        if ( $scope.typeInput == 'password' ) {
            $scope.typeInput = 'text';
        }
        else {
            $scope.typeInput = 'password';
        }
    } // changeType

})




.controller('RegisterCtrl', function($scope, $http, $window){
    $scope.rol = "Administrador";
    $scope.typeInput = 'password';
    $scope.data = {}

    $scope.crearUsuario = function () {
        var tipo = $scope.rol;

        if ( tipo == 'Administrador' ) {
            $http({
              method: 'POST',
              url: '/api/admin',
              data: $scope.data
            }).then(
              function (response) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se ha creado el Administrador. Inicie sesion",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                            $window.location.href="/iniciaSesion";
                        }
                    }]
                }); 
              },
              function (errorResponse) {
                console.log(errorResponse.data);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: errorResponse.data.message,
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
              }
            );
        }
        // *************************
        if ( tipo == 'Moderador' ) {
            $http({
              method: 'POST',
              url: '/api/moderador',
              data: $scope.data
            }).then(
              function (response) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se ha creado el Moderador. Inicie sesion",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                            $window.location.href="/iniciaSesion";
                        }
                    }]
                }); 
              },
              function (errorResponse) {
                console.log(errorResponse.data);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: errorResponse.data.message,
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
              }
            );
        }
        // ******************
        if ( tipo == 'Usuario' ) {
            $http({
              method: 'POST',
              url: '/api/user',
              data: $scope.data
            }).then(
              function (response) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se ha creado el Usuario. Inicie sesion",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                            $window.location.href="/iniciaSesion";
                        }
                    }]
                }); 
              },
              function (errorResponse) {
                console.log(errorResponse.data);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: errorResponse.data.message,
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
              }
            );
        }
    } // crearUsuario


    $scope.changeType = function () {
        if ( $scope.typeInput == 'password' ) {
            $scope.typeInput = 'text';
        }
        else {
            $scope.typeInput = 'password';
        }
    } // changeType
    

})




/*///////////////////////////////
    ADMINISTRADORES
///////////////////////////////*/
.controller('PerfilAdminCtrl', function($scope, $http, $window){
    $scope.usuario = {}

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/admin/session/getData'
        })
        .then(
            function(response){
                $scope.usuario = response.data;
            },
            function(errorResponse){
                console.log(errorResponse.data.message);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cargar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // init


    $scope.logout = function () {
        $http({
            method: 'GET',
            url: '/api/log/out'
        })
        .then(
            function (response) {
                $window.location.reload();
            },
            function (errorResponse) {
                console.log(errorResponse.data.message);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cerrar sesión",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        )
    } // logout
    

})




.controller('EditPerfilAdminCtrl', function($scope, $http, $window){
    $scope.datosAdmin = {}
    $scope.repeatPassword = "";
    $scope.cambioArchivo = false;

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/admin/session/getData'
        })
        .then(
            function(response){
                $scope.datosAdmin = response.data;
                $scope.repeatPassword = $scope.datosAdmin.password;
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cargar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // init


    $scope.verificarPasswordEquals = function () {
        var check = angular.equals($scope.datosAdmin.password, $scope.repeatPassword);
        if (check == false) {
             BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Error',
                closable: false,
                message: "Las contraseñas no coinciden",
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialogItself) { 
                        dialogItself.close(); 
                    }
                }]
            });
        }
        else {
            $scope.send();
        }
    } // verificarPasswordEquals


    $scope.selectFile = function (){
      $scope.cambioArchivo = true;
      var formatosPermitidos= ['jpg','jpeg','png','PNG',"JPG"];
      var archivo = document.getElementById("image_file").files[0];
      if(archivo!=undefined){
        var nombreArchivo = archivo.name;
        var extArchivo = nombreArchivo.split('.').pop();
        var vistaArchivo = document.getElementById('preview');
        var oReader = new FileReader();
        oReader.onload = function(e) {
            if ($.inArray(extArchivo,formatosPermitidos) > -1) {
              esArchivoValido=true;
              vistaArchivo.src = e.target.result;
            }
            else {
              esArchivoValido=false;
              alert("Formato de imagen inválido");
            }
        };
        oReader.readAsDataURL(archivo);
      }
      else{
        esArchivoValido=false;
        alert("No se escogio ninguna foto");
      }
    } // selectFile


    $scope.send = function () {
        if ($scope.cambioArchivo){
            var rutaImagen = document.getElementById("preview").src;
            $scope.datosAdmin.foto = rutaImagen;
        }
        $http({
            method: 'PUT',
            url: '/api/admin/'+$scope.datosAdmin._id,
            data: $scope.datosAdmin
        })
        .then(
            function(response){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se actualizó la información exitosamente",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                            $window.location.href="/perfilAdmin";
                        }
                    }]
                }); 
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al actualizar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );        
    } // send


    $scope.back = function () {
        $window.history.back();
    } // back

})





/*///////////////////////////////
    MODERADORES
///////////////////////////////*/
.controller('PerfilModeradorCtrl', function($scope, $http, $window){
    $scope.usuario = {}

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/moderador/session/getData'
        })
        .then(
            function(response){
                $scope.usuario = response.data;
            },
            function(errorResponse){
                console.log(errorResponse.data.message);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cargar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // init


    $scope.logout = function () {
        $http({
            method: 'GET',
            url: '/api/log/out'
        })
        .then(
            function (response) {
                $window.location.reload();
            },
            function (errorResponse) {
                console.log(errorResponse.data.message);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cerrar sesión",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        )
    } // logout


})



.controller('EditPerfilModeradorCtrl', function($scope, $http, $window){
    $scope.datosModerador = {}
    $scope.repeatPassword = "";
    $scope.cambioArchivo = false;

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/moderador/session/getData'
        })
        .then(
            function(response){
                $scope.datosModerador = response.data;
                $scope.repeatPassword = $scope.datosModerador.password;
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cargar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // init


    $scope.verificarPasswordEquals = function () {
        var check = angular.equals($scope.datosModerador.password, $scope.repeatPassword);
        if (check == false) {
             BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Error',
                closable: false,
                message: "Las contraseñas no coinciden",
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialogItself) { 
                        dialogItself.close(); 
                    }
                }]
            });
        }
        else {
            $scope.send();
        }
    } // verificarPasswordEquals


    $scope.selectFile = function (){
      $scope.cambioArchivo = true;
      var formatosPermitidos= ['jpg','jpeg','png','PNG',"JPG"];
      var archivo = document.getElementById("image_file").files[0];
      if(archivo!=undefined){
        var nombreArchivo = archivo.name;
        var extArchivo = nombreArchivo.split('.').pop();
        var vistaArchivo = document.getElementById('preview');
        var oReader = new FileReader();
        oReader.onload = function(e) {
            if ($.inArray(extArchivo,formatosPermitidos) > -1) {
              esArchivoValido=true;
              vistaArchivo.src = e.target.result;
            }
            else {
              esArchivoValido=false;
              alert("Formato de imagen inválido");
            }
        };
        oReader.readAsDataURL(archivo);
      }
      else{
        esArchivoValido=false;
        alert("No se escogio ninguna foto");
      }
    } // selectFile


    $scope.send = function () {
        if ($scope.cambioArchivo){
            var rutaImagen = document.getElementById("preview").src;
            $scope.datosModerador.foto = rutaImagen;
        }
        $http({
            method: 'PUT',
            url: '/api/moderador/'+$scope.datosModerador._id,
            data: $scope.datosModerador
        })
        .then(
            function(response){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se actualizó la información exitosamente",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                            $window.location.href="/perfilAdmin";
                        }
                    }]
                }); 
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al actualizar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );        
    } // send


    $scope.back = function () {
        $window.history.back();
    } // back

})




/*///////////////////////////////
    USUARIOS
///////////////////////////////*/
.controller('PerfilUsuarioCtrl', function($scope, $http, $window, $location){
    $scope.usuario = {}

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/user/session/getData'
        })
        .then(
            function(response){
                $scope.usuario = response.data;
            },
            function(errorResponse){
                console.log(errorResponse.data.message);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cargar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // init


    $scope.logout = function () {
        $http({
            method: 'GET',
            url: '/api/log/out'
        })
        .then(
            function (response) {
                $window.location.reload();
            },
            function (errorResponse) {
                console.log(errorResponse.data.message);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cerrar sesión",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        )
    } // logout

})



.controller('EditPerfilUsuarioCtrl', function($scope, $http, $window){
    $scope.datosUsuario = {}
    $scope.datosUsuario.redesSociales = {}
    $scope.repeatPassword = "";
    $scope.cambioArchivo = false;

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/user/session/getData'
        })
        .then(
            function(response){
                $scope.datosUsuario = response.data;
                $scope.repeatPassword = $scope.datosUsuario.password;
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al cargar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // init


    $scope.verificarPasswordEquals = function () {
        var check = angular.equals($scope.datosUsuario.password, $scope.repeatPassword);
        if (check == false) {
             BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Error',
                closable: false,
                message: "Las contraseñas no coinciden",
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialogItself) { 
                        dialogItself.close(); 
                    }
                }]
            });
        }
        else {
            $scope.send();
        }
    } // verificarPasswordEquals


    $scope.selectFile = function (){
      $scope.cambioArchivo = true;
      var formatosPermitidos= ['jpg','jpeg','png','PNG',"JPG"];
      var archivo = document.getElementById("image_file").files[0];
      if(archivo!=undefined){
        var nombreArchivo = archivo.name;
        var extArchivo = nombreArchivo.split('.').pop();
        var vistaArchivo = document.getElementById('preview');
        var oReader = new FileReader();
        oReader.onload = function(e) {
            if ($.inArray(extArchivo,formatosPermitidos) > -1) {
              esArchivoValido=true;
              vistaArchivo.src = e.target.result;
            }
            else {
              esArchivoValido=false;
              alert("Formato de imagen inválido");
            }
        };
        oReader.readAsDataURL(archivo);
      }
      else{
        esArchivoValido=false;
        alert("No se escogio ninguna foto");
      }
    } // selectFile


    $scope.send = function () {
        if ($scope.cambioArchivo){
            var rutaImagen = document.getElementById("preview").src;
            $scope.datosUsuario.foto = rutaImagen;
        }
        $http({
            method: 'PUT',
            url: '/api/user/'+$scope.datosUsuario._id,
            data: $scope.datosUsuario
        })
        .then(
            function(response){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se actualizó la información exitosamente",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                            $window.location.href="/perfilAdmin";
                        }
                    }]
                }); 
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al actualizar los datos",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );        
    } // send


    $scope.back = function () {
        $window.history.back();
    } // back


})





/*//////////////////////////////
    FORO ESTUDIANTES
//////////////////////////////*/
.controller('foroEstudiantesCtrl', function($scope, $http){
    var tipoUsuario = document.getElementById('tipoUsuario').innerText;
    $scope.tipoUsuario = tipoUsuario;
    $scope.isAdmin = false; // *
    $scope.editando = false;
    $scope.ready = false;
    $scope.maximoTitulo = 100;
    $scope.maximoContenido = 500;
    
    $scope.dispCont = $scope.maximoContenido;
    $scope.dispTitulo = $scope.maximoTitulo;

    $scope.forosEst = [];

    $scope.alertNuevoForo = function () {
        $scope.editando = false;
        $scope.initForo();
    }

    $scope.initForo = function () {
        $scope.foro = {}
        $scope.foro.categoria = "Estudiantes";
        $scope.foro.titulo = "";
        $scope.foro.contenido = "";
    }

    $scope.restanteContenido = function () {
        $scope.dispCont = $scope.maximoContenido - $scope.foro.contenido.length;
    }

    $scope.restanteTitulo = function () {
        $scope.dispTitulo = $scope.maximoTitulo - $scope.foro.titulo.length;
    }

    $scope.init = function () {
        $scope.initForo();
        $http({
            method: 'GET',
            url: '/api/admin/session/isAdmin'
        })
        .then(
          function (responseisAdmin) { 
            $http({
                method: 'GET',
                url: '/api/foro/categoria/Estudiantes'
            })
            .then(
                function(response){
                    $scope.forosEst = response.data;
                    $scope.ready = true;
                    $scope.isAdmin = responseisAdmin.data.isAdmin;
                },
                function(errorResponse){
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al obtener los foros",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
          },
          function (errorResponse) {}
        );
    } // init

    $scope.guardarForo = function () {
        if ( $scope.editando == false ) {
            $http({
                method: 'POST',
                url: '/api/foro',
                data: $scope.foro
            })
            .then(
                function(response){
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se creo el foro exitosamente",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                },
                function(errorResponse){
                    console.log(errorResponse);
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al crear el foro",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
        }
        if ( $scope.editando == true ) {
            $http({
                method: 'PUT',
                url: '/api/foro/'+ $scope.foro._id,
                data: $scope.foro
            })
            .then(
                function(response){
                    $scope.editando = false;
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se actualizó el foro exitosamente",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                },
                function(errorResponse){
                    console.log(errorResponse);
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al actualizar el foro",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
        }
    } // guardarForo


    $scope.llenarModal = function (foro) {
        $scope.foro = foro;
        $scope.restanteContenido();
        $scope.restanteTitulo();
        $scope.editando = true;
        $('#myModalNorm').modal('show');
    } // llenarModal


    $scope.confirmarEliminar = function (foro) {
        BootstrapDialog.confirm({
            title: "Confirmar",
            message: "¿Desea elimiar este foro?<br>Esta acción no se podrá deshacer",
            type: BootstrapDialog.TYPE_WARNING,
            closable: false,
            callback: function (result) {
                if (result) {
                    $scope.eliminarForo(foro);
                }
            }
        });
    } // confirmarEliminar


    $scope.eliminarForo = function (foro) {
        $http({
            method: 'DELETE',
            url: '/api/foro/'+foro._id
        })
        .then(
            function(response){
                $scope.init(); // reload
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se eliminó el foro exitosamente",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            },
            function(errorResponse){
                console.log(errorResponse);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al eliminar el foro",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // elimiinarForo

})




/*//////////////////////////////
    FORO DOCENTES
//////////////////////////////*/
.controller('foroDocentesCtrl', function($scope, $http){
    var tipoUsuario = document.getElementById('tipoUsuario').innerText;
    $scope.tipoUsuario = tipoUsuario;
    $scope.isAdmin = false;
    $scope.editando = false;
    $scope.ready = false;
    $scope.maximoTitulo = 100;
    $scope.maximoContenido = 500;
    
    $scope.dispCont = $scope.maximoContenido;
    $scope.dispTitulo = $scope.maximoTitulo;

    $scope.forosDoc = [];

    $scope.alertNuevoForo = function () {
        $scope.editando = false;
        $scope.initForo();
    }

    $scope.initForo = function () {
        $scope.foro = {}
        $scope.foro.categoria = "Docentes";
        $scope.foro.titulo = "";
        $scope.foro.contenido = "";
    }

    $scope.restanteContenido = function () {
        $scope.dispCont = $scope.maximoContenido - $scope.foro.contenido.length;
    }

    $scope.restanteTitulo = function () {
        $scope.dispTitulo = $scope.maximoTitulo - $scope.foro.titulo.length;
    }

    $scope.init = function () {
        $scope.initForo();
        $http({
            method: 'GET',
            url: '/api/admin/session/isAdmin'
        })
        .then(
          function (responseisAdmin) { 
            $http({
                method: 'GET',
                url: '/api/foro/categoria/Docentes'
            })
            .then(
                function(response){
                    $scope.forosDoc = response.data;
                    $scope.ready = true;
                    $scope.isAdmin = responseisAdmin.data.isAdmin;
                },
                function(errorResponse){
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al obtener los foros",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
          },
          function (errorResponse) {}
        );
    } // init

    $scope.guardarForo = function () {
        if ( $scope.editando == false ) {
            $http({
                method: 'POST',
                url: '/api/foro',
                data: $scope.foro
            })
            .then(
                function(response){
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se creo el foro exitosamente",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                },
                function(errorResponse){
                    console.log(errorResponse);
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al crear el foro",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
        }
        if ( $scope.editando == true ) {
            $http({
                method: 'PUT',
                url: '/api/foro/'+ $scope.foro._id,
                data: $scope.foro
            })
            .then(
                function(response){
                    $scope.editando = false;
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se actualizó el foro exitosamente",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                },
                function(errorResponse){
                    console.log(errorResponse);
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al actualizar el foro",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
        }
    } // guardarForo


    $scope.llenarModal = function (foro) {
        $scope.foro = foro;
        $scope.restanteContenido();
        $scope.restanteTitulo();
        $scope.editando = true;
        $('#myModalNorm').modal('show');
    } // llenarModal


    $scope.confirmarEliminar = function (foro) {
        BootstrapDialog.confirm({
            title: "Confirmar",
            message: "¿Desea elimiar este foro?<br>Esta acción no se podrá deshacer",
            type: BootstrapDialog.TYPE_WARNING,
            closable: false,
            callback: function (result) {
                if (result) {
                    $scope.eliminarForo(foro);
                }
            }
        });
    } // confirmarEliminar


    $scope.eliminarForo = function (foro) {
        $http({
            method: 'DELETE',
            url: '/api/foro/'+foro._id
        })
        .then(
            function(response){
                $scope.init(); // reload
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se eliminó el foro exitosamente",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            },
            function(errorResponse){
                console.log(errorResponse);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al eliminar el foro",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // elimiinarForo

})





/*//////////////////////////////
    FORO AYUDANTES
//////////////////////////////*/
.controller('foroAyudantesCtrl', function($scope, $http){
    var tipoUsuario = document.getElementById('tipoUsuario').innerText;
    $scope.tipoUsuario = tipoUsuario;

    $scope.isAdmin = false;
    $scope.editando = false;
    $scope.ready = false;
    $scope.maximoTitulo = 100;
    $scope.maximoContenido = 500;
    
    $scope.dispCont = $scope.maximoContenido;
    $scope.dispTitulo = $scope.maximoTitulo;

    $scope.forosAyu = [];

    $scope.alertNuevoForo = function () {
        $scope.editando = false;
        $scope.initForo();
    }

    $scope.initForo = function () {
        $scope.foro = {}
        $scope.foro.categoria = "Ayudantes";
        $scope.foro.titulo = "";
        $scope.foro.contenido = "";
    }

    $scope.restanteContenido = function () {
        $scope.dispCont = $scope.maximoContenido - $scope.foro.contenido.length;
    }

    $scope.restanteTitulo = function () {
        $scope.dispTitulo = $scope.maximoTitulo - $scope.foro.titulo.length;
    }

    $scope.init = function () {
        $scope.initForo();
        $http({
            method: 'GET',
            url: '/api/admin/session/isAdmin'
        })
        .then(
          function (responseisAdmin) { 
            $http({
                method: 'GET',
                url: '/api/foro/categoria/Ayudantes'
            })
            .then(
                function(response){
                    $scope.forosAyu = response.data;
                    $scope.ready = true;
                    $scope.isAdmin = responseisAdmin.data.isAdmin;
                },
                function(errorResponse){
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al obtener los foros",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
          },
          function (errorResponse) {}
        );
    } // init

    $scope.guardarForo = function () {
        if ( $scope.editando == false ) {
            $http({
                method: 'POST',
                url: '/api/foro',
                data: $scope.foro
            })
            .then(
                function(response){
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se creo el foro exitosamente",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                },
                function(errorResponse){
                    console.log(errorResponse);
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al crear el foro",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
        }
        if ( $scope.editando == true ) {
            $http({
                method: 'PUT',
                url: '/api/foro/'+ $scope.foro._id,
                data: $scope.foro
            })
            .then(
                function(response){
                    $scope.editando = false;
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se actualizó el foro exitosamente",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                },
                function(errorResponse){
                    console.log(errorResponse);
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Error',
                        closable: false,
                        message: "Ocurrio un error al actualizar el foro",
                        buttons: [{
                            label: 'Cerrar',
                            action: function (dialogItself) { 
                                dialogItself.close(); 
                            }
                        }]
                    }); 
                }
            );
        }
    } // guardarForo


    $scope.llenarModal = function (foro) {
        $scope.foro = foro;
        $scope.restanteContenido();
        $scope.restanteTitulo();
        $scope.editando = true;
        $('#myModalNorm').modal('show');
    } // llenarModal


    $scope.confirmarEliminar = function (foro) {
        BootstrapDialog.confirm({
            title: "Confirmar",
            message: "¿Desea elimiar este foro?<br>Esta acción no se podrá deshacer",
            type: BootstrapDialog.TYPE_WARNING,
            closable: false,
            callback: function (result) {
                if (result) {
                    $scope.eliminarForo(foro);
                }
            }
        });
    } // confirmarEliminar


    $scope.eliminarForo = function (foro) {
        $http({
            method: 'DELETE',
            url: '/api/foro/'+foro._id
        })
        .then(
            function(response){
                $scope.init(); // reload
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se eliminó el foro exitosamente",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                });
            },
            function(errorResponse){
                console.log(errorResponse);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al eliminar el foro",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // elimiinarForo

})




/*//////////////////////////////
    CONTENIDO DEL FORO
//////////////////////////////*/
.controller('foroContenidoCtrl', function($scope, $http){
    var id = document.getElementById('idForo').innerText;
    $scope.idForo = id;
    var tipoUsuario = document.getElementById('tipoUsuario').innerText;
    $scope.tipoUsuario = tipoUsuario;
    var correoUsuario = document.getElementById('correoUsuario').innerText;
    $scope.correoUsuario = correoUsuario;

    $scope.foro = {}
    $scope.comentarioNuevo = {}
    $scope.comentarioNuevo.contenido = "";
    $scope.isBlocked = false;

    $scope.maximoContenido = 160;
    $scope.dispCont = $scope.maximoContenido;
    $scope.dispTitulo = $scope.maximoTitulo;
    
    $scope.initComentario = function () {
        $scope.comentarioNuevo = {}
        $scope.comentarioNuevo.contenido = "";
    }

    $scope.restanteContenido = function () {
        $scope.dispCont = $scope.maximoContenido - $scope.comentarioNuevo.contenido.length;
    }


    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/foro/'+$scope.idForo
        })
        .then(
            function(response){
                $scope.foro = response.data;
                $scope.selfBloqueo();
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al obtener el foro",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // init


    $scope.comentar = function () {
        var data = {
          idForo: $scope.idForo,
          contenido: $scope.comentarioNuevo.contenido
        }
        $http({
          method: 'POST',
          url: '/api/foro/comentarios/nuevo',
          data: data
        })
        .then(
          function (response) {
            $scope.initComentario();
            $scope.init();
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_SUCCESS,
                title: 'Exito',
                closable: false,
                message: "Comentario agregado exitosamente",
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialogItself) { 
                        dialogItself.close(); 
                    }
                }]
            });
          },
          function (errorResponse) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Error',
                closable: false,
                message: "Ocurrio un error al agregar el comentario a este foro",
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialogItself) { 
                        dialogItself.close(); 
                    }
                }]
            }); 
          }
        );
    } // comentar


    $scope.confirmarBloquear = function (propietarioElim) {
        BootstrapDialog.confirm({
            title: "Confirmar",
            message: "¿Desea bloquear a este usuario?",
            type: BootstrapDialog.TYPE_WARNING,
            closable: false,
            callback: function (result) {
                if (result) {
                    $scope.bloquear(propietarioElim);
                }
            }
        });
    } // confirmarBloquear


    $scope.bloquear = function (propietarioEliminar) {
        $http({
          method: 'POST',
          url: '/api/foro/bloqueos/nuevo',
          data: { usuario: propietarioEliminar, idForo: $scope.idForo }
        })
        .then(
          function (response) {
            $scope.init();
            BootstrapDialog.show({
              type: BootstrapDialog.TYPE_SUCCESS,
              title: 'Exito',
              closable: false,
              message: "Usuario bloqueado",
              buttons: [{
                label: 'Cerrar',
                action: function (dialogItself) {  dialogItself.close(); }
              }]
            });
          },
          function (errorResponse) {
            console.log(errorResponse);
            BootstrapDialog.show({
              type: BootstrapDialog.TYPE_DANGER,
              title: 'Error',
              closable: false,
              message: "Ocurrio un error al agregar el comentario a este foro",
              buttons: [{
                label: 'Cerrar',
                action: function (dialogItself) { dialogItself.close(); }
              }]
            }); 
          }
        );
    } // bloquear


    $scope.checkBloqueo = function (usuario) {
       var bloqueos = $scope.foro.bloqueos;
       var check = false;
       for (var i = 0; i < bloqueos.length; i++) {
         if ( bloqueos[i].usuario.correo == usuario.correo ) {
          check = true;
          break;
         }
         else {
          return false;
         }
       }
       return check;
    } // checkBloqueo


    $scope.selfBloqueo = function () {
       var correo = $scope.correoUsuario;
       var bloqueos = $scope.foro.bloqueos;
       for (var i = 0; i < bloqueos.length; i++) {
         if ( bloqueos[i].usuario.correo == correo ) {
          $scope.isBlocked = true;
          break;
         }
         else {
          $scope.isBlocked = false;
         }
       }
    }


    $scope.confirmarDesbloquear = function (user) {
        BootstrapDialog.confirm({
          title: "Confirmar",
          message: "¿Desea desbloquear a este usuario?",
          type: BootstrapDialog.TYPE_WARNING,
          closable: false,
          callback: function (result) {
            if (result) {
              $scope.desbloquear(user);
            }
          }
        });
    } // confirmarDesbloquear


    $scope.desbloquear = function (user) {
        $http({
          method: 'POST',
          url: '/api/foro/bloqueos/eliminar',
          data: { correo: user.correo, idForo: $scope.foro._id }
        })
        .then(
            function(response){
                $scope.init(); // reload
                BootstrapDialog.show({
                  type: BootstrapDialog.TYPE_SUCCESS,
                  title: 'Exito',
                  closable: false,
                  message: "Se desbloqueó al usuario",
                  buttons: [{
                    label: 'Cerrar',
                    action: function (dialogItself) {  dialogItself.close(); }
                  }]
                });
            },
            function(errorResponse){
                console.log(errorResponse);
                BootstrapDialog.show({
                  type: BootstrapDialog.TYPE_DANGER,
                  title: 'Error',
                  closable: false,
                  message: "Ocurrio un error al desbloquear al usuario",
                  buttons: [{
                    label: 'Cerrar', 
                    action: function (dialogItself) { dialogItself.close(); }
                  }]
                }); 
            }
        );
    } // eliminarComentario


    $scope.confirmarEliminar = function (comment) {
        BootstrapDialog.confirm({
          title: "Confirmar",
          message: "¿Desea eliminar este foro?<br>Esta acción no se podrá deshacer",
          type: BootstrapDialog.TYPE_WARNING,
          closable: false,
          callback: function (result) {
            if (result) {
              $scope.eliminarComentario(comment);
            }
          }
        });
    } // confirmarEliminar


    $scope.eliminarComentario = function (comentarioAEliminar) {
        $http({
            method: 'DELETE',
            url: '/api/foro/comentarios/eliminar/'+comentarioAEliminar._id
        })
        .then(
            function(response){
                $scope.init(); // reload
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se eliminó el foro exitosamente",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                });
            },
            function(errorResponse){
                console.log(errorResponse);
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al eliminar el foro",
                    buttons: [{
                        label: 'Cerrar',
                        action: function (dialogItself) { 
                            dialogItself.close(); 
                        }
                    }]
                }); 
            }
        );
    } // eliminarComentario

})







;
