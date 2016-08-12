var app = angular.module('GreenThumb', ['ngRoute', 'ngSanitize']);

app.controller('UserController', ['$scope', '$routeParams', '$http', '$rootScope', funciton($scope, $routeParams, $http, $rootScope){

}]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'index.html',
		controller: UserController,
		controllerAs: 'user'
	});
}]);