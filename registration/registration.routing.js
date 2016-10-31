(function () {
    'use strict';

    angular
        .module('myApp.registration')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'registration/registration.html',
            controller: 'registration.ctrl'
        })
    }
})();