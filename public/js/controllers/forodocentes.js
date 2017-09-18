angular.module('myApp')


.controller('foroDocentesCtrl', function($scope, $http){
    if ( document.getElementById('tipoUsuario') ) { var tipoUsuario = document.getElementById('tipoUsuario').innerText; $scope.tipoUsuario = tipoUsuario; }
    $scope.isAdmin = false;
    $scope.editando = false;
    $scope.ready = false;
    $scope.maximoTitulo = 100;
    $scope.maximoContenido = 500;
    
    $scope.dispCont = $scope.maximoContenido;
    $scope.dispTitulo = $scope.maximoTitulo;

    $scope.forosDoc = [];

    $scope.getSession = function (argument) {
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){ },
          function(errorResponse){ window.location.replace("/"); }
        );
    }

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
        $scope.getSession();
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
;