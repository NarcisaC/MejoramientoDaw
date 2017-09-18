angular.module('myApp')


.controller('archivosUsuarioCtrl', function($scope, $http, $window){
    var tipoUsuario = document.getElementById('tipoUsuario').innerText;
    $scope.tipoUsuario = tipoUsuario;
    $scope.recursos = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/recurso/ayudantes/disponibles'
        })
        .then(
          function (response) {
            console.log(response.data)
            $scope.recursos = response.data;
          },
          function (errorResponse) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: 'Error',
                closable: false,
                message: "Ocurrio un error al obtener los recursos",
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


    $scope.nuevaVentana = function (link) {
        var link = String(link);
        console.log(link)
        $window.open(link, '_blank');
    }


})
;