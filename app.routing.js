(function () {
    'use strict';

    angular
        .module('myApp')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }
})();
