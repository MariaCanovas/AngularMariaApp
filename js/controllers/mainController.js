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
        vm.agregar = agregar;
        vm.done = done;
        vm.borrar = borrar;
        vm.borrarMemoria = borrarMemoria;

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

        function agregar(newTask){
            localStorage.set('tareas-' + vm.tareas.length, newTask);
            cargarMemoria();
        }
        function done(indexUpdated, taskUpdated){
            localStorage.set('tareas-' + indexUpdated, taskUpdated);
            cargarMemoria();

        }
        function borrar(indexDeleted){
            localStorage.removeItem('tareas-'+ indexDeleted);
            cargarMemoria();
        }
        function borrarMemoria(){
            localStorage.remove();
            cargarMemoria();

        }


	}
}());