/*global  angular*/
(function () {
    'use strict';

    var moduleDependencies = ['mariaApp.directive', 'mariaApp.listaDirective'];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);

    function mainController($scope,localStorage){
     	var vm = $scope;

     	// Funciones publicas:
     	vm.init = init;
     	vm.cargarMemoria = cargarMemoria;

     	//Init
     	function init(){
     		vm.fecha = new Date();
     		asignarNombre();
     		cargarMemoria();
		}

		// Arrancar
		vm.init();

		// Funciones publicas:
		function asignarNombre(){
			vm.name = "Maria Dolores";
		}
		function cargarMemoria(){
            vm.tareas = localStorage.getAll();
        }

        function agregar(){

        }
        function done(index){

        	var task = vm.tareasDirectiva[index];
            localStorage.set('tareas-' + index, task);

        }
        function borrar(){

        }


	}
}());