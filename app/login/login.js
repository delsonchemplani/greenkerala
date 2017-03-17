'use strict';
 
//angular.module('myApp.login', ['ngRoute'])
 
 angular.module('myKalahulluApp')
// Declared route 
/*.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])*/
 
// Home controller
.controller('LoginCtrl', ['$scope','$location','Auth',function($scope,$location,Auth) {

  

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


firebase.auth().signInWithEmailAndPassword(username, password).then(function() {
  // Sign-in successful.
   console.log('Authentication success');
   Auth.setUser($scope.user); 
    //redirectTo: '/login'
    //redirectTo: '/home'
   //$location.path('/home');
   //Update the state of the user in the app
   //return;
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