(function () {
'use strict';

angular
.module('myApp.companies')
.controller('companies.ctrl', Controller);
function Controller($scope, $http) {
	//$scope.countCompany = 0;
	let init = function() {
		$http.get('http://codeit.pro/frontTestTask/company/getList')
		.success(function(data) {
			console.log(data);
			$scope.countCompany = data.list.length;
			console.log(data.list.length);
			$scope.companies = data.list;
			console.log(data.list);
			})
		};
		init();
}
})();