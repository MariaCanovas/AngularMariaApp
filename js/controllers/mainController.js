/*global  angular*/
(function () {
    'use strict';
    var moduleDependencies = [];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);


     function mainController($scope, $timeout){

	   	$scope.tareas = [{text:'Aprender AngulaJS', hecho:false}];
	    
	    $scope.name = "Maria Dolores";

	    $scope.addTarea = function() {
	        $scope.tareas.push({text:$scope.tarea, hecho:false});
	        $scope.tarea = "";
	    };
	    $scope.clock = function()
		{
			var reloj = new Date();
			var horas = reloj.getHours();
			var minutos = reloj.getMinutes();
			var segundos = reloj.getSeconds();

			// Agrega un cero si .. minutos o segundos <10
			minutos = $scope.revisarTiempo(minutos);
			segundos = $scope.revisarTiempo(segundos);
			document.getElementById('reloj').innerHTML = horas + ":" + minutos + ":" + segundos;


		};
		$scope.revisarTiempo = function(i)
		{
			if (i<10)
			{
				i="0"+i;
			}
			return i;
		};
	}

}());