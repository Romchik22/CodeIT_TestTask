(function () {
'use strict';

angular
.module('myApp.registration')
.controller('registration.ctrl', Controller);
function Controller($scope, $http, $location, $httpParamSerializerJQLike) {
	$scope.sex = ["male", "female"];
	$scope.selectedSex = $scope.sex[0];
	$scope.check = false;
	$scope.errorMessage = '';
	$scope.field = '';
	$scope.status = '';
	$scope.clickSubmit = function () {
		if(!$scope.registrationForm.$invalid) {
			let registrationData  =  $httpParamSerializerJQLike({
				name: $scope.name,
				secondname: $scope.secondName,
				email: $scope.email,
				gender: $scope.selectedSex,
				pass: $scope.password
			});

			let config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			}
			$http.post('http://codeit.pro/frontTestTask/user/registration', registrationData, config)
			.success(function (data) {
				$scope.status = data.status;
				$scope.errorMessage = data.message;
				$scope.field = data.field;
				if($scope.status == 'OK') {
					$location.path('/companies');
				}
			})
			.error(function(error) {
				console.log(error);
			});
		}
	} 
}
})();
