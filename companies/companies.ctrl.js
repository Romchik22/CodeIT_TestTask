(function () {
'use strict';

angular
.module('myApp.companies')
.controller('companies.ctrl', Controller);
function Controller($scope, $http) {
	const countriesMap = new Map();
	const arrayColorForChart = [];

	function init () {
	$http.get('http://codeit.pro/frontTestTask/company/getList')
	.success(function(data) {
		$scope.countCompany = data.list.length;
		$scope.companies = data.list;
		makeCountriesMap(data.list);
		makeArrayColor(countriesMap.size);
		drawChart(Array.from(countriesMap.keys()), Array.from(countriesMap.values()), arrayColorForChart);
		})
	};
	init();

	function drawChart (labels, data, backgroundColor) {
		var ctx = document.getElementById("myChart");
		var data = {
		    labels: labels,
	    	datasets: [
	        	{
	            data: [34, 18, 23, 4, 18, 3],
	            backgroundColor: backgroundColor,
	        }]
		};
			
		$scope.myPieChart = new Chart(ctx,{
			type: 'pie',
			data: data,
		    options: {
				scales: {
	    			yAxes: [{
	        			ticks: {
	            			beginAtZero:true
	        			}
	    			}]
				}
			}
		});
	}

	function getRandomColor() {
    	var letters = '0123456789ABCDEF'.split('');
    	var color = '#';
    	for (var i = 0; i < 6; i++ ) {
       		color += letters[Math.floor(Math.random() * 16)];
    	}
    	return color;
	}

	function makeCountriesMap (countries) {
		for(let i = 0; i < countries.length; i++) {
			var temp = countries[i].location.name;
			if(countriesMap.has(temp)){
				var countCountry  = countriesMap.get(temp);
				countCountry++;
				countriesMap.set(temp, countCountry);
			} else {
				countriesMap.set(temp, 1);
			}
		}
	}

	function makeArrayColor(length) {
		for(let i = 0; i < length; i++) {
			arrayColorForChart[i] = getRandomColor();
		}
	}
}
})();