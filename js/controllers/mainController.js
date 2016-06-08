/*global  angular*/
(function () {
    'use strict';
    var moduleDependencies = [];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);


     function mainController($scope, $interval, localStorage){

     	$scope.init = function(){
     		$scope.name = "Maria Dolores";
		    $scope.hora = new Date();
		    $scope.segundos = $scope.hora.getSeconds();
		    $scope.minutos = $scope.hora.getMinutes();
		    $scope.horas = $scope.hora.getHours();

		    $interval(function() {
			$scope.actualizarSegundo();
		}, 1000);

	    $scope.actualizarSegundo = function(){
	    	$scope.segundos += 1;
	    	if($scope.segundos == 60){
	    		$scope.segundos = 0;
	    		$scope.actualizarMinuto();
	    	}
	    };
	    $scope.actualizarMinuto = function(){
	    	$scope.minutos += 1;
	    	if($scope.minutos == 60){
	    		$scope.minutos = 0;
	    		$scope.actualizarHora();
	    	}
	    };
	    $scope.actualizarHora = function(){
	    	$scope.horas += 1;
	    	if($scope.horas == 24){
	    		$scope.horas = 0;
	    	}
	    };
	    $scope.cargarMemoria();

     	};
       	$scope.cargarMemoria = function(){
       		$scope.tareas = JSON.parse(localStorage.getAll());
       		//$scope.tareas = localStorage.getAll();

       		//console.log($scope.tareas);
	    };
	    $scope.posicion = 0;
	    
	    $scope.addTarea = function() {
	    	var task = {
	    		text: $scope.tarea,
	    		hecho: false
	    	};
	    	$scope.tareas.push(task);
	    	localStorage.set($scope.tareas.length, JSON.stringify(task));
	    	
	        //localStorage.set($scope.tareas.length, task);
	        //$scope.tareas.push(task);
	        $scope.tarea = "";
	    };
	    $scope.borrar = function() {
			var tareasAnteriores = $scope.tareas;
			$scope.tareas = [];
			angular.forEach(tareasAnteriores, function(tareas){
				if ($scope.tarea.hecho === false)
					$scope.tareas.push(tareas);
		});
		localStorage.set($scope.tareas.length, JSON.stringify($scope.tareas));
	};
	}
	angular.module('mariaApp').filter('fix', function() {
	    	return function(elemento){
	    		if(elemento < 10){
	    			return "0" + elemento;
	    		}
	    		return elemento;
	    	}; 	
	    });
}());
