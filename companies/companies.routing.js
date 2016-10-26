/**
 * Created by sobolrr on 03.10.16.
 */
(function () {
    'use strict';

    angular
        .module('myApp.companies')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider.when('/companies', {
            templateUrl: 'companies/companies.html',
            controller: 'companies.ctrl'
        })
    }

})();