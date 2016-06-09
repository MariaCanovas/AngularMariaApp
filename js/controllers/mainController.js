/*global  angular*/
(function () {
    'use strict';
    var moduleDependencies = ['mariaApp.directive'];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);


    function mainController($scope, localStorage){
     	var vm = $scope;

     	// Funciones publicas:
     	vm.init = init;
     	vm.cargarMemoria = cargarMemoria;
     	vm.fecha = new Date();
		vm.addTarea = addTarea;
		vm.setDone = setDone;
		vm.borrar = borrar;

     	// Arrancar
		vm.init();
     	//Init
     	function init(){
     		asignarNombre();
		    vm.cargarMemoria();
		}

		// Funciones publicas:
		function asignarNombre(){
			vm.name = "Maria Dolores";
		}
		
	    function cargarMemoria(){
       		vm.tareas = localStorage.getAll();
	    }
	   
	    function addTarea() {
	    	var task = {
                text: vm.tarea,
                hecho: false
            };
	    	localStorage.set('tareas-' + vm.tareas.length, task);
	    	vm.tareas.push(task);
	        vm.tarea = "";
	    }

	    function setDone(index) {
	    	var task = vm.tareas[index];
	    	localStorage.set('tareas-' + index, task);
	    }

	    function borrar() {
			var tareasAnteriores = vm.tareas;
			vm.tareas = [];
			angular.forEach(tareasAnteriores, function(tareas){
				if (vm.tarea.hecho === false)
					vm.tareas.push(tareas);
			});

		}
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
