angular.module('myApp',['angular-loading-bar', 'datatables', 'nvd3'])



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



.controller('headerCtrl', function ($scope, $http) {

    $scope.init = function (argument) {

      console.log( document.getElementById('showInit') )
      
      if ( document.getElementById('showInit') ) { 
        var showInit = document.getElementById('showInit').innerText; 
        console.log(showInit)
        $scope.showInit = (showInit == 'true'); 
      }
      
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){
            $scope.showInit = false;
          },
          function(errorResponse){ 
            $scope.showInit = true;
          }
        );
    }
})
;