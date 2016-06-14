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
(function() {
    'use strict';
    angular
        .module('mariaApp.listaDirective', [])
        .directive('listaDirective', lista);
  
    function lista() {
        var ddo =  {
            restrict: 'E',
            replace: true,
            template: "<div class='listaDirective'><div class ='add'><input class='input' type='text' ng-model='vm.inputTarea' placeholder='Agregar nueva cosa por hacer'></input><button class='botonAdd' ng-click='vm.addTarea()'><span class='texto-boton'> Agregar </span></button></div> <div class='listaTareas' ng-repeat = 'tarea in vm.tareasDirectiva track by tarea.id'> <input type='checkbox' ng-model='tarea.hecho' ng-click ='vm.setDone(tarea.text, tarea.hecho,tarea.id)'</input> <button class='botonBorrar' ng-click='vm.deleteTask(tarea.id)'>Borrar</button><span ng-class='{hecho: tarea.hecho == true}'>{{tarea.text}} </span></div> </div>",
            controller: listaController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                agregar: '&',
                done: '&',
                borrar: '&',
                tareas: '='
            }
        };
        return ddo;

        function listaController($scope) { 

            var vm = this;
            vm.addTarea = addTarea;
            vm.setDone = setDone;
            vm.deleteTask = deleteTask;

            function init(){
                vm.tareasDirectiva = angular.copy(vm.tareas);
            }   

            init();

            $scope.$watch('vm.tareas', function(newValue, oldValue){
                if(newValue !== oldValue){
                    vm.tareasDirectiva = angular.copy(vm.tareas);
                }
            });

            function addTarea() {
                var fecha = new Date();
                var timestamp = fecha.getTime();
                var task = {
                    text: vm.inputTarea,
                    hecho: false,
                    id: timestamp
                };
                vm.agregar({newId: task.id ,newTask: task});
                vm.inputTarea = '';
            }

            function setDone(texto, done, id) {
                var task = {
                    text: texto,
                    hecho: done,
                    id: id

                };
                vm.done({idUpdated: id, taskUpdated: task});
            }

            function deleteTask(id) {
                vm.borrar({idDeleted: id});
                              
            }

        }
    }
}());

(function() {
    'use strict';

    angular
        .module('mariaApp.directive',  ['mariaApp.filter'])
        .directive('relojDirective', reloj);
  
    function reloj() {
        var ddo =  {
            restrict: 'E',
            replace: true,
            template: '<div>{{vm.horas | relojFilter}} : {{vm.minutos | relojFilter}} : {{vm.segundos | relojFilter}}</div>',
            controller: relojController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                fecha : '='
            }
        };
        return ddo;
    
        function relojController($interval) {
            var vm = this;

            // Public functions:
            vm.init = init;
         
            function init() {
                actualizarReloj();
            }
            init();

            // Private functions:
            function actualizarReloj(){
                vm.segundos = vm.fecha.getSeconds();
                vm.minutos = vm.fecha.getMinutes();
                vm.horas = vm.fecha.getHours();

                $interval(function() {
                    actualizarSegundo();
                }, 1000);
            }
            function actualizarSegundo(){
                vm.segundos += 1;
                if(vm.segundos == 60){
                    vm.segundos = 0;
                    actualizarMinuto();
                }
            }
            function actualizarMinuto(){
                vm.minutos += 1;
                if(vm.minutos == 60){
                    vm.minutos = 0;
                    actualizarHora();
                }
            }
            function actualizarHora(){
                vm.horas += 1;
                if(vm.horas == 24){
                    vm.horas = 0;
                }
            }
        }
    }

}());
(function() {
    'use strict';

    angular.module('mariaApp.filter', [])
    .filter('relojFilter', function() {
        return function(elemento){
            if(elemento < 10){
                return "0" + elemento;
            }
            return elemento;
        };
    });
}());
(function() {
    'use strict';
    angular
        .module('mariaApp')
        .service('localStorage', service);

        function service() {

            var service = {
                getAll: getAll,
                set: set,
                remove: remove,
                removeItem: removeItem
            };
            return service;

            function getAll() {
                var keys = Object.keys(localStorage);
                var tasks = [];
                for(var i = 0; i < keys.length; i++){
                	tasks.push(JSON.parse(localStorage.getItem(keys[i])));
                }
                return tasks;
            }

            function set(clave, valor){
                localStorage.setItem(clave, JSON.stringify(valor));
            }

            function remove(){
                localStorage.clear();
            }
            function removeItem(id){
                localStorage.removeItem(id);

            }

        }
    }());