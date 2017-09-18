angular.module('myApp')


.controller('foroGlobalCtlr', function($scope, $http){
    if ( document.getElementById('tipoUsuario') ) { var tipoUsuario = document.getElementById('tipoUsuario').innerText; $scope.tipoUsuario = tipoUsuario; }
    $scope.getSession = function (argument) {
        $http({ method: 'GET', url: '/api/user/session/getPermission' })
        .then(
          function(response){ },
          function(errorResponse){ window.location.replace("/"); }
        );
    }
    $scope.init = function () {
    	//$scope.getSession();
    }
})
;
