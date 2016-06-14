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