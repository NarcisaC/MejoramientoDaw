angular.module('myApp')


.controller('archivosAdminCtrl', function($scope, $http, DTOptionsBuilder, DTColumnDefBuilder, $window){
    if ( document.getElementById('tipoUsuario') ) { var tipoUsuario = document.getElementById('tipoUsuario').innerText; $scope.tipoUsuario = tipoUsuario; }
    $scope.recurso = {}
    $scope.recurso.forUsers = true;
    $scope.recursoS = {}

    $scope.recursos = [];
    $scope.recursosD = [];
    $scope.editando = false;
    $scope.cambioArchivo = false;

    $scope.getSession = function (argument) {
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){ },
          function(errorResponse){ window.location.replace("/"); }
        );
    }

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

    $scope.alertNuevo = function () {
        $scope.editando = false;
        $scope.initRecurso();
    }

    $scope.initRecurso = function () {
        document.getElementById('preview').src = "";
        $scope.recurso = {}
        $scope.recurso.foto = "";
        $scope.recurso.forUsers = true;
    }

    $scope.initRecursoS = function () {
        $scope.recursoS = {}
    }

    $scope.llenarRecursoS = function (recursoS) {
        $scope.recursoS = recursoS;
        $("#myModalView").modal("show");
    }

    $scope.init = function () {
        //$scope.getSession();
        $scope.initRecurso();
        $http({
            method: 'GET',
            url: '/api/recurso'
        })
        .then(
          function (response) {
            $scope.recursos = response.data;
            $scope.init2();
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

    $scope.guardar = function () {
        if ($scope.cambioArchivo){
            var rutaImagen = document.getElementById("preview").src;
            $scope.recurso.foto = rutaImagen;
        }
        if ( $scope.editando == false ) {
            $http({
                method: 'POST',
                url: '/api/recurso',
                data: $scope.recurso
            })
            .then(
                function(response){
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se añadió el recurso exitosamente",
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
                        message: "Ocurrio un error al añadir este recurso",
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
                url: '/api/recurso/'+ $scope.recurso._id,
                data: $scope.recurso
            })
            .then(
                function(response){
                    $scope.editando = false;
                    $scope.init(); // reload
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Exito',
                        closable: false,
                        message: "Se actualizó el recurso exitosamente",
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
                        message: "Ocurrio un error al actualizar el recurso",
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


    $scope.llenarModal = function (recurso) {
        $scope.recurso = recurso;
        $scope.editando = true;
        $('#myModalNorm').modal('show');
    } // llenarModal


    $scope.confirmarEliminar = function (recurso) {
        BootstrapDialog.confirm({
            title: "Confirmar",
            message: "¿Desea elimiar este recurso?<br>Esta acción no se podrá deshacer",
            type: BootstrapDialog.TYPE_WARNING,
            closable: false,
            callback: function (result) {
                if (result) {
                    $scope.eliminar(recurso);
                }
            }
        });
    } // confirmarEliminar


    $scope.eliminar = function (recurso) {
        $http({
            method: 'DELETE',
            url: '/api/recurso/'+recurso._id
        })
        .then(
            function(response){
                $scope.init(); // reload
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Exito',
                    closable: false,
                    message: "Se eliminó el recurso exitosamente",
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
                    message: "Ocurrio un error al eliminar el recurso",
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


    $scope.init2 = function () {
        $http({
            method: 'GET',
            url: '/api/recurso/ayudantes/disponibles'
        })
        .then(
          function (response) {
            $scope.recursosD = response.data;
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

