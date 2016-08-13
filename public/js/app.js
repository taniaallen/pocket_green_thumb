var app = angular.module('GreenThumb', ['ngRoute', 'ngSanitize']);

app.controller('UserController', ['$scope', '$routeParams', '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope){
	var controller = this;
	$scope.showContent = false;


	// change the login partial to the sign up partial if the user clicks on the "Sign Up" link.
	this.includePath = 'partials/login.html';
	this.signUpPath = function(){
		this.includePath = 'partials/signup.html';
	};

	// Log in Action
	this.logIn = function(user){

		$http({
			method: 'POST',
			url: '/users/login',
			data: user
		}).then(function(response){
			controller.user = response.data.data;
			console.log(controller.user);
			$scope.showContent = true;
		});
	}

	this.signUp = function(user){

		$http({
			method: 'POST',
			url: '/users/signup',
			data: user
		}).then(function(response){
			controller.user = response.data.data;
			$scope.showContent = true;
		});
	}
}]);

app.controller('PlantsController', ['$http', '$scope', function($http, $scope){
	var controller = this;

	this.getPlants = function(name){
		$http({
			method: 'GET',
			url: 'https://plantsdb.xyz/search?='+name
		}).then(function(response){
			//sucess callback
			console.log(response);
		}, function(response){
			//fail callback
			console.log(response);
		});
	}
}]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({enabled:true});

	$routeProvider.when('/', {
		templateUrl: 'index.html',
		controller: 'UserController',
		controllerAs: 'user'
	}).when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'UserController',
		controller: 'user'
	}).when('/signup',{
		templateUrl: 'partials/signup.html',
		controller: 'UserController',
		controller: 'user'		
	}).when('/search',{
		templateUrl: 'partials/search.html',
		controller: 'UserController',
		controllerAs: 'user'
	});
}]);