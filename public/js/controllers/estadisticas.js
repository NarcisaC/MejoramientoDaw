angular.module('estApp', ['nvd3'])


.controller('estadisticasCtrl', function($scope, $http, $window){
    $scope.cantUser = 0;
    $scope.showInit = false;
    $scope.cantModer = 0;
    $scope.cantAdmins = 0;
    $scope.data = [
      [0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    $scope.getData1 = function () {
      $scope.cantUser = 0;
      $scope.cantModer = 0;
      $scope.cantAdmins = 0;
      $http({ method: 'GET', url: '/api/user'})
      .then(
         function (response) {
          var response3 = response.data;
           for (var i = 0; i < response3.length; i++) {
             var usuario = response3[i];
             //console.log(usuario)
             if ( usuario.tipoUsuario=="admin" ) {
                $scope.cantAdmins = $scope.cantAdmins+1;
             }
             if ( usuario.tipoUsuario=="moderador" ) {
                $scope.cantModer = $scope.cantModer+1;
             }
             if ( usuario.tipoUsuario=="usuario" ) {
                $scope.cantUser = $scope.cantUser+1;
             }
           }
           $scope.data1 = [
             { key: "Admins", y: $scope.cantAdmins },
             { key: "Moderadores", y: $scope.cantModer },
             { key: "Clientes", y: $scope.cantUser }
           ];

         }
       );
    }

    $scope.options1 = {
        chart: {
            type: 'pieChart',
            height: 400,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            valueFormat: function(d){
              return d3.format(',.0f')(d) + ' persona(s)';
            },
            duration: 500,
            labelThreshold: 0.03,
            labelSunbeamLayout: true,
            legend: {
                padding: 42,
                margin: {
                  top: 5,
                  right: 90,
                  bottom: 5,
                  left: 50
                }
            }
        }
    };


    $scope.getData2 = function () {
      $scope.cantUser = 0;
      $scope.cantModer = 0;
      $scope.cantAdmins = 0;
      $http({ method: 'GET', url: '/api/recurso/estadisticas/materias'})
      .then(
         function (response) {
          $scope.data2 = response.data;
        },
        function (errorResponse) {
          $scope.data2 = [
            { key: "None", y: 0 }
          ] 
        }
       );
    }

    
    $scope.getData3 = function () {
      $scope.data = [
        [0,0,0,0,0,0,0,0,0,0,0,0]
      ];
      var currentDate  = new Date();
      var Year  = currentDate.getFullYear();
      var _inicio = new Date(Year,  0,  1);
      var _fin    = new Date(Year, 11, 31);
      var datos = {
        inicio: _inicio,
        fin: _fin
      }
      $http({ method: 'POST', url: '/api/recurso/rango/estadisticas', data: datos })
      .then(
        function (response) {
            $scope.data = response.data.data;
            $scope.data3 = [
              {
                key: "Cantidad de ejercicios por meses",
                values: [
                  { "label" : "Ene" , "value" : response.data.data[0][0] },
                  { "label" : "Feb" , "value" : response.data.data[0][1] },
                  { "label" : "Mar" , "value" : response.data.data[0][2] },
                  { "label" : "Abr" , "value" : response.data.data[0][3] },
                  { "label" : "May" , "value" : response.data.data[0][4] },
                  { "label" : "Jun" , "value" : response.data.data[0][5] },
                  { "label" : "Jul" , "value" : response.data.data[0][6] },
                  { "label" : "Ago" , "value" : response.data.data[0][7] },
                  { "label" : "Sep" , "value" : response.data.data[0][8] },
                  { "label" : "Oct" , "value" : response.data.data[0][9] },
                  { "label" : "Nov" , "value" : response.data.data[0][10] },
                  { "label" : "Dic" , "value" : response.data.data[0][11] }
                ]
              }
            ];
        },
        function (errorResponse) {
            console.log(errorResponse);
            $scope.data3 = [
              {
                key: "Cantidad de ejercicios por meses",
                values: [
                  { "label" : "Ene" , "value" : $scope.data[0][0] },
                  { "label" : "Feb" , "value" : $scope.data[0][1] },
                  { "label" : "Mar" , "value" : $scope.data[0][2] },
                  { "label" : "Abr" , "value" : $scope.data[0][3] },
                  { "label" : "May" , "value" : $scope.data[0][4] },
                  { "label" : "Jun" , "value" : $scope.data[0][5] },
                  { "label" : "Jul" , "value" : $scope.data[0][6] },
                  { "label" : "Ago" , "value" : $scope.data[0][7] },
                  { "label" : "Sep" , "value" : $scope.data[0][8] },
                  { "label" : "Oct" , "value" : $scope.data[0][9] },
                  { "label" : "Nov" , "value" : $scope.data[0][10] },
                  { "label" : "Dic" , "value" : $scope.data[0][11] }
                ]
              }
            ];
        }
      );
    }


    $scope.options3 = {
        chart: {
            type: 'discreteBarChart',
            height: 400,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.0f')(d);
            },
            duration: 500,
            legend:{
              padding: 35
            },
            xAxis: {
              axisLabel: 'Meses'
            },
            yAxis: {
              axisLabel: 'Cantidad de ejercicios',
              axisLabelDistance: -5
            }
        }
    };


    $scope.options2 = {
        chart: {
            type: 'pieChart',
            height: 400,
            donut: true,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            pie: {
                //startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                //endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                startAngle: function(d) { return d.startAngle },
                endAngle: function(d) { return d.endAngle }
            },
            duration: 500,
            legend: {
              padding: 35,
              margin: { top: 5, right: 140, bottom: 5, left: 120 }
            }
        }
    };


    $scope.init = function () {
        $scope.getData1();
        $scope.getData2();
        $scope.getData3();
    } // init

})
;