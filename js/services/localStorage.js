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