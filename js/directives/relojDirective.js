(function() {
    'use strict';

    angular
        .module('mariaApp.directive',  ['mariaApp.filter'])
        .controller('RelojController', RelojController)
        .directive('relojDirective', reloj);

  
    function RelojController($interval) {
            var vm = this;
            // Public functions:
            vm.init = init;
            vm.actualizarSegundo = actualizarSegundo;
            vm.actualizarMinuto = actualizarMinuto;
            vm.actualizarHora = actualizarHora;
         
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
                    if(vm.initReloj === true) {
                        vm.segundos = actualizarSegundo(vm.segundos);
                    }
                }, 1000);
            }
            function actualizarSegundo(segundos){
                segundos += 1;
                if(segundos == 60){
                    segundos = 0;
                    vm.minutos = actualizarMinuto(vm.minutos);
                }
                return segundos;
            }
            function actualizarMinuto(minutos){
                minutos += 1;
                if(minutos == 60){
                    minutos = 0;
                    vm.horas = actualizarHora(vm.horas);
                }
                return minutos;
            }
            function actualizarHora(horas){
                horas += 1;
                if(horas == 24){
                    horas = 0;
                }
                return horas;
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
                initReloj : '='
            }
        };
        return ddo;
    }
}());