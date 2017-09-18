angular.module('myApp')


.controller('conectadosCtrl', function($scope, $http, $window, $location, socket){
    if ( document.getElementById('tipoUsuario') ) { var tipoUsuario = document.getElementById('tipoUsuario').innerText; $scope.tipoUsuario = tipoUsuario; }

    $scope.usuariosLogueados = [];

    socket.on('newlog', function (data) {
        $scope.init();
    });

    $scope.init = function () {
        $scope.getSession();
        $http({
          method: 'GET',
          url: '/api/manejoSesiones'
        })
        .then(
            function(response){
                //console.log(response.data);
                $scope.usuariosLogueados = response.data;
            },
            function(errorResponse){
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Error',
                    closable: false,
                    message: "Ocurrio un error al obtener los usuarios",
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


    $scope.getSession = function (argument) {
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){ },
          function(errorResponse){ window.location.replace("/"); }
        );
    }


})



.factory('socket', function ($rootScope) {
  var socket = io.connect("localhost:3000");
  return {

    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }

  };
})
;