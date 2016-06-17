/*global  angular*/
(function () {
    'use strict';

    var moduleDependencies = ['mariaApp.directive', 'mariaApp.listaDirective'];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);

    function mainController($scope,localStorageSrv){
     	var vm = $scope;

     	// Funciones publicas:
     	vm.init = init;
     	vm.cargarMemoria = cargarMemoria;
        vm.agregar = agregar;
        vm.done = done;
        vm.borrar = borrar;
        vm.borrarMemoria = borrarMemoria;
        vm.asignarNombre = asignarNombre;

     	//Init
     	function init(){
     		vm.fecha = new Date();
     		asignarNombre();
     		cargarMemoria();
		}
		// Arrancarbo
		vm.init();

		// Funciones publicas:
		function asignarNombre(){
            vm.name = "Maria Dolores";
        }
		function cargarMemoria(){
            vm.tareas = localStorageSrv.getAll();
            toDoTasks();
        }
        function agregar(newId, newTask){
            localStorageSrv.set(newId, newTask);
            cargarMemoria();
        }
        function done(idUpdated, taskUpdated){
            localStorageSrv.set(idUpdated, taskUpdated);
            cargarMemoria();        

        }
        function borrar(idDeleted){
            localStorageSrv.removeItem(idDeleted);
            cargarMemoria();
        }
        function borrarMemoria(){
            localStorageSrv.remove();
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