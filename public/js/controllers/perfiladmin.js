angular.module('myApp')


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
;