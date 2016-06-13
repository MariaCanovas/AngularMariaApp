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
            console.log(vm.tareas[0].hecho);
            toDoTasks();
        }

        function agregar(newId, newTask){
            localStorage.set(newId, newTask);
            cargarMemoria();
        }
        function done(idUpdated, taskUpdated){
            localStorage.set(idUpdated, taskUpdated);
            cargarMemoria();

        }
        function borrar(idDeleted){
            localStorage.removeItem(idDeleted);
            cargarMemoria();
        }
        function borrarMemoria(){
            localStorage.remove();
            cargarMemoria();

        }
        function toDoTasks(){
            vm.toDoTasks = 0;
            for(var i = 0; i < vm.tareas.length; i++){
                if(vm.tareas[i].hecho === false){
                        vm.toDoTasks += 1;
                }
            }
        }
    }
}());