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
