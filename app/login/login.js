'use strict';
 
angular.module('myApp.login', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])
 
// Home controller
.controller('LoginCtrl', ['$scope',function($scope) {

//var firebaseObj = new Firebase("https://kalahullu-2064b.firebaseio.com");
//var firebaseObj = new Firebase("kalahullu-2064b.firebaseapp.com");

// var loginObj = $firebaseSimpleLogin(firebaseObj);
  // $scope.authObj = $firebaseAuth(firebaseObj);
  //var firebase = require("firebase/app");

 $scope.SignIn = function(event) {
 	event.preventDefault();  
    var username = $scope.user.email;
    var password = $scope.user.password;
     
    // Auth Logic will be here

alert(username);
alert(password);

firebase.auth().signInWithEmailAndPassword(username, password).then(function() {
  // Sign-in successful.
   console.log('Authentication success');
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
   console.log('Authentication failure'+errorMessage);
  // ...
});

    /* firebaseObj.authWithPassword( {
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
        }, function(error) {
            // Failure callback
            console.log('Authentication failure'+error);
        });*/

}

}]);