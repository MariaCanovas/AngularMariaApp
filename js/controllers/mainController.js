/*global  angular*/
(function () {
    'use strict';
    var moduleDependencies = [];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);


     function mainController($scope, $interval){

     	$scope.name = "Maria Dolores";
	   	$scope.tareas = [{text:'Aprender AngulaJS', hecho:false}];
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
	    $scope.addTarea = function() {
	        $scope.tareas.push({text:$scope.tarea, hecho:false});
	        $scope.tarea = "";
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
