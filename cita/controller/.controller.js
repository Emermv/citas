/**
 * @author 
 * @since 9/2/2016
 */
(function () {
    'use strict';

    angular
        .module('prueba')
        .controller('Controller', Controller);

    /* @ngInject */
    function Controller ($log) {
        var vm = this;
        vm.class = 'Controller';

        activate();

        //////////////

        function activate() {
            $log.debug('Activating ' + vm.class);
        }
    }
})();
