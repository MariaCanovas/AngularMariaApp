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
                //fecha : '='
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
                console.log('fecha:', vm.fecha);
                
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