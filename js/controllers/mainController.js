/*global  angular*/
(function () {
    'use strict';
    var moduleDependencies = [];

    angular.module('mariaApp', moduleDependencies)
        .controller('mainController', mainController);


     function mainController($scope, $interval, localStorage){
     	var vm = $scope;

     	// Funciones publicas:
     	vm.init = init;
     	
     	vm.actualizarReloj = actualizarReloj;
		vm.cargarMemoria = cargarMemoria;
		vm.actualizarSegundo = actualizarSegundo;
		vm.actualizarMinuto = actualizarMinuto;
		vm.actualizarHora = actualizarHora;
		vm.addTarea = addTarea;
		vm.setDone = setDone;
		vm.borrar = borrar;


     	// Arrancar
		vm.init();
     	//Init
     	function init(){
     		asignarNombre();
     		vm.actualizarReloj();
		    vm.cargarMemoria();
		}

		// Funciones publicas:
		function asignarNombre(){
			vm.name = "Maria Dolores";
		}
		function actualizarReloj(){
			vm.hora = new Date();
		    vm.segundos = vm.hora.getSeconds();
		    vm.minutos = vm.hora.getMinutes();
		    vm.horas = vm.hora.getHours();

		    $interval(function() {
				vm.actualizarSegundo();
			}, 1000);
		}
	    function actualizarSegundo(){
	    	vm.segundos += 1;
	    	if(vm.segundos == 60){
	    		vm.segundos = 0;
	    		vm.actualizarMinuto();
	    	}
	    }
	    function actualizarMinuto(){
	    	vm.minutos += 1;
	    	if(vm.minutos == 60){
	    		vm.minutos = 0;
	    		vm.actualizarHora();
	    	}
	    }
	   function actualizarHora(){
	    	vm.horas += 1;
	    	if(vm.horas == 24){
	    		vm.horas = 0;
	    	}
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

			localStorage.set(vm.tareas.length, angular.toJson(vm.tareas));
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
