var app = angular.module('GreenThumb', ['ngRoute', 'ngSanitize']);

app.controller('UserController', ['$scope', '$routeParams', '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope){
	var controller = this;
	$scope.showContent = false;

	// change the login partial to the sign up partial if the user clicks on the "Sign Up" link.
	this.includePath = 'partials/login.html';
	this.signUp = function(){
		this.includePath = 'partials/signup.html';
	};
}]);




app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'index.html',
		controller: 'UserController',
		controllerAs: 'user'
	});
}]);