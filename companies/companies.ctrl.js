(function () {
'use strict';

angular
.module('myApp.companies')
.controller('companies.ctrl', Controller);
function Controller($scope, $http) {
	$scope.load = true;
	const countriesMap = new Map();
	const arrayColorForChart = [];
	$scope.myInterval = 3000;
	$scope.chartFlag =  true;
	$scope.partnersFlag = false;
	$scope.percentSortFlag = false;
	$scope.nameSortFlag = false;

	function init () {
	
	$http.get('http://codeit.pro/frontTestTask/company/getList')
	.success(function(data) {
		$scope.countCompany = data.list.length;
		$scope.companies = data.list;
		makeCountriesMap(data.list);
		makeArrayColor(countriesMap.size);
		drawChart(Array.from(countriesMap.keys()), Array.from(countriesMap.values()), arrayColorForChart);
		})

	$http.get('http://codeit.pro/frontTestTask/news/getList')
	.success(function(data) {
		$scope.news = data.list;
		$scope.load = false;
	})
	};

	init();
	
	function drawChart (labels, dat, backgroundColor) {
		var ctx = document.getElementById("myChart");
		var data = {
		    labels: labels,
	    	datasets: [
	        	{
	            data: dat,
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

		$scope.click = function (e) {
			filerCompaniesByCountry($scope.companies, $scope.myPieChart.getElementsAtEvent(e)[0]._view.label)
			$scope.chartFlag = false;
		}	
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
	
	function formatDate(date) {

	  var dd = date.getDate();
	  if (dd < 10) dd = '0' + dd;

	  var mm = date.getMonth() + 1;
	  if (mm < 10) mm = '0' + mm;

	  var yy = date.getFullYear() % 100;
	  if (yy < 10) yy = '0' + yy;

	  return dd + '.' + mm + '.' + yy;
	}

	$scope.getDate = function (date) {
		return formatDate(new Date(parseInt(date)));
	}

	function filerCompaniesByCountry(list, country) {
		$scope.companiesByCountry = [];
		for(let i = 0; i < list.length; i++) {
			if(list[i].location.name == country) {
				$scope.companiesByCountry.push(list[i]);
			}
		}
	}

	$scope.changeChartFlag = function () {
		$scope.chartFlag =  true;
	}

	$scope.getPartners = function (index) {
		$scope.partners = [];
		let temp = $scope.companies[index].partners;
		let percent = calcPercentPartners(temp);
		let height = percent.map(function(x) {return 20 * x});

		for(let i = 0; i < temp.length; i++) {
			let partner = {};

			partner.name = temp[i].name;
			partner.percent = percent[i].toFixed(2);
			partner.height = height[i] + 'em';
			partner.backgroundColor = getRandomColor();

			$scope.partners.push(partner);
		}

		$scope.partnersFlag = true;
	}

	function calcPercentPartners(partners) {
		let sum = 0;
		let percentArray = [];
		for(let i = 0; i < partners.length; i++) {
			sum += partners[i].value;
			percentArray.push(partners[i].value);
		}
		return percentArray.map(function(x) {
			return x / sum;
		})
	}

	function compare (property, flag) {
		 return function(a,b) {
		 		//let number = flag ? 1 : -1; 

				if (a[property] > b[property]) {
					return flag ? 1 : -1;
				}
				if (a[property] < b[property]) {
					return flag ? -1 : 1;
				}
			return 0;
			}
	};

	$scope.sortPartnersByName = function () {
		let temp = $scope.partners;
		$scope.partners = {};
		temp.sort(compare('name', $scope.nameSortFlag));
		$scope.partners = temp;
		$scope.nameSortFlag = !$scope.nameSortFlag;
	}

	$scope.sortPartnersByPercentage = function () {
		let temp = $scope.partners;
		$scope.partners = {};
		temp.sort(compare('percent', $scope.percentSortFlag));
		$scope.partners = temp;
		$scope.percentSortFlag = !$scope.percentSortFlag;
	}

}
})();
