angular.module('myApp')


.controller('horarioCtrl', function($scope){
    var today = new Date();
    $scope.horaInicial = today.setHours(7,0,0,0);
    $scope.horaFinal = today.setHours(18,0,0,0);
    $scope.Horas = [];
    $scope.Dispo = [];

    $scope.sumarMinutos = function (fecha, minutos) {
      var fecha = new Date(fecha);
      var newFecha = fecha.setMinutes( parseInt(fecha.getMinutes()) + parseInt(minutos) );
      return newFecha;
    }

    $scope.generarHoras = function () {
      var arrayHoras = [];
      var init = $scope.horaInicial;
      arrayHoras.push(init);
      $scope.Dispo.push(true);
      while ( init < $scope.horaFinal ) {
        init = $scope.sumarMinutos(init,30);
        arrayHoras.push(init);
        $scope.Dispo.push(false);
      }
      console.log(arrayHoras)
      return arrayHoras;
    }

    $scope.init = function () {
      $scope.Horas = $scope.generarHoras();
    }

});