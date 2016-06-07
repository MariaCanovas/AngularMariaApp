/*global  angular*/
(function () {
    'use strict';
    var moduleDependencies = [];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);


     function mainController($scope, $timeout){

	   	$scope.tareas = [{text:'Aprender AngulaJS', hecho:false}];
	    $scope.hora = new Date();
	    $scope.name = "Maria Dolores";

	    $timeout(function() {
		 	$scope.hora = new Date();
		 }, 1000);

	    $scope.addTarea = function() {
	        $scope.tareas.push({text:$scope.tarea, hecho:false});
	        $scope.tarea = "";
	    };
	    
	}

}());
