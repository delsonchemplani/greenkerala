'use strict';
 
angular.module('myApp.login', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])
 
// Home controller
.controller('LoginCtrl', ['$scope','$firebaseAuth',function($scope,$firebaseAuth) {

//var firebaseObj = new Firebase("https://kalahullu-2064b.firebaseio.com");
var firebaseObj = new Firebase("kalahullu-2064b.firebaseapp.com");

// var loginObj = $firebaseSimpleLogin(firebaseObj);
   $scope.authObj = $firebaseAuth(firebaseObj);
 $scope.SignIn = function(event) {
 	event.preventDefault();  
    var username = $scope.user.email;
    var password = $scope.user.password;
     
    // Auth Logic will be here

alert(username);
alert(password);
     $scope.authObj.$authWithPassword( {
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
        });

}

}]);