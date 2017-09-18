angular.module('myApp')


.controller('foroContenidoCtrl', function($scope, $http){
    var id = document.getElementById('idForo').innerText;
    $scope.idForo = id;
    if ( document.getElementById('tipoUsuario') ) { var tipoUsuario = document.getElementById('tipoUsuario').innerText; $scope.tipoUsuario = tipoUsuario; }
    var correoUsuario = document.getElementById('correoUsuario').innerText;
    $scope.correoUsuario = correoUsuario;

    $scope.foro = {}
    $scope.comentarioNuevo = {}
    $scope.comentarioNuevo.contenido = "";
    $scope.isBlocked = false;

    $scope.maximoContenido = 160;
    $scope.dispCont = $scope.maximoContenido;
    $scope.dispTitulo = $scope.maximoTitulo;
    
    $scope.getSession = function (argument) {
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){ },
          function(errorResponse){ window.location.replace("/"); }
        );
    }

    $scope.initComentario = function () {
        $scope.comentarioNuevo = {}
        $scope.comentarioNuevo.contenido = "";
    }

    $scope.restanteContenido = function () {
        $scope.dispCont = $scope.maximoContenido - $scope.comentarioNuevo.contenido.length;
    }


    $scope.init = function () {
      $scope.getSession();
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
