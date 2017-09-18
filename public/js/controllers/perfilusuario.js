angular.module('myApp')


.controller('PerfilUsuarioCtrl', function($scope, $http, $window, $location, socket){
    if ( document.getElementById('tipoUsuario') ) { var tipoUsuario = document.getElementById('tipoUsuario').innerText; $scope.tipoUsuario = tipoUsuario; }
    $scope.usuario = {}
    $scope.usuarioMenuVertical = {}

    $scope.onInit = function () {
        $http({
          method: 'GET',
          url: '/api/user/session/getData'
        })
        .then(
          function(response){ $scope.usuarioMenuVertical = response.data; },
          function(errorResponse){ }
        );
    }

    $scope.init = function () {
        $scope.getSession();
        $http({
            method: 'GET',
            url: '/api/user/session/getData'
        })
        .then(
            function(response){
                socket.emit('LoginEvent', response.data );
                $scope.usuario = response.data;
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


    $scope.logout = function () {
        $http({
          method: 'GET',
          url: '/api/user/session/getData'
        })
        .then(
          function(response){ 
            var SS = response.data;
            $http({
                method: 'GET',
                url: '/api/log/out'
            })
            .then(
                function (response) {
                    socket.emit('LogoutEvent', SS );
                    $window.location.reload();
                },
                function (errorResponse) {
                    //console.log(errorResponse.data.message);
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
            );

          },
          function(errorResponse){ }
        );
    } // logout


    $scope.getSession = function (argument) {
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){ },
          function(errorResponse){ window.location.replace("/"); }
        );
    }


})



.controller('EditPerfilUsuarioCtrl', function($scope, $http, $window){
    if ( document.getElementById('tipoUsuario') ) { var tipoUsuario = document.getElementById('tipoUsuario').innerText; $scope.tipoUsuario = tipoUsuario; }
    $scope.datosUsuario = {}
    $scope.datosUsuario.redesSociales = {}
    $scope.repeatPassword = "";
    $scope.cambioArchivo = false;

    $scope.getSession = function (argument) {
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){ },
          function(errorResponse){ window.location.replace("/"); }
        );
    }

    $scope.init = function () {
        $scope.getSession();
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
                            $window.location.href="/user/perfil";
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


;