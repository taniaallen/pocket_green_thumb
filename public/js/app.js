var app = angular.module('GreenThumb', ['ngRoute', 'ngSanitize']);

app.controller('UserController', ['$scope', '$routeParams', '$http', '$rootScope', function($scope, $routeParams, $http, $rootScope){
	var controller = this;
	$scope.showContent = false;
	$scope.showList = false;
	$scope.loggedOut = '';

	controller.plants = [];


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
		console.log(user);

		$http({
			method: 'POST',
			url: '/users/signup',
			data: user
		}).then(function(response){
			$scope.user = response.data.data;
			$scope.showContent = true;
		});
	}

	$scope.logOut = function() {
		IN.User.logout(function() {
			$scope.showContent = false;
			$http ({
				method: 'GET',
				url: '/users/logout' 
			}).then(function(response){
				$scope.loggedOut = reponse.data;
			}, function(response){
				console.log(response);
				$scope.showList = true;
			});
		});
	}


// Post a new plant to the user's plants array
	this.newPlants = function(plant){


		$http({
			method: 'POST',
			url: '/users/:id/newplant',
			data: this
		}).then(function(response){
			//sucess callback
			console.log(response.data.plants);
			controller.plants = response.data.plants;
			$scope.showList = true;
		}, function(response){
			//fail callback
			console.log(response);
		});
	}


// 	this.getPlants = function(){
// 		$http({
// 			method: 'GET',
// 			url: '/users/:id/plants'
// 		}).then(function(response){
// 			console.log(response);
// 		}, function(response){
// 			console.log('error:');
// 			console.log(response);
// 		});
// 	}
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
	}).when('/newplant',{
		templateUrl: 'partials/newplant.html',
		controller: 'UsersController',
		controllerAs: 'plant'
	}).when('/:id/plants', {
		controller: 'UserController',
		controllerAs: 'user'
		});
}]);