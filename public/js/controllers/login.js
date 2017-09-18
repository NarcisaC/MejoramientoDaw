angular.module('myApp')


.controller('LoginController', function($scope, $http, $window){
	$scope.user = {}
	$scope.user.correo = "";
	$scope.user.password = "";
	$scope.typeInput = 'password';

	$scope.iniciarSesion = function(){
		$http({
            method: 'POST',
            url: '/api/log/in',
            data: $scope.user
        })
        .then(
        	function(response){
            	$window.location.href = response.data.url;
          	},
          	function(errorResponse){
          		console.log(errorResponse.data.message);
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
    } // iniciarSesion

    
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