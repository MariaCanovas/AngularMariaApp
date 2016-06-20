(function() {
    'use strict';

    angular
        .module('mariaApp.directive',  ['mariaApp.filter'])
        .controller('RelojController', RelojController)
        .directive('relojDirective', reloj);

  
    function RelojController($interval) {
            var vm = this;
            var segundos;
            // Public functions:
            vm.init = init;
            vm.actualizarSegundo = actualizarSegundo;
         
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
            function actualizarSegundo(segundos){
                segundos += 1;
                if(segundos == 60){
                    segundos = 0;
                    actualizarMinuto();
                }
                return segundos;
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

    function reloj() {
        var ddo =  {
            restrict: 'E',
            replace: true,
            template: '<div>{{vm.horas | relojFilter}} : {{vm.minutos | relojFilter}} : {{vm.segundos | relojFilter}}</div>',
            controller: RelojController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                fecha : '=',
                initReloj: '='
            }
        };
        return ddo;
    }
}());