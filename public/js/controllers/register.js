angular.module('myApp')


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
;