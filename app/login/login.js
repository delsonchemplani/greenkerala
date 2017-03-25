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

   Auth.login(username,password);
   Auth.setUser(username); 

   var item={
    "name":"Hirvy White Shirt",
    "description":"This simplistic white shirt from Hirvy fashions is a fine piece with a contemporary trendy colour. Crafted from pure cotton, style yours with jeans or chinos for a laid-back look.",
    "sizes":[38,40],
    "price":340.00,
    "Sleeves" : "Full Sleeves",
    "Material" : "100% Cotton",
   "Fit" : "Slim Fit",
  "Pattern" : "Solid",
  "Occasion" : "Casual",
  "Color" : "White"


   }
   var itemId=123;
  // var newItems = new Firebase('https://kalahullu-2064b.firebaseio.com/items');
  firebase.database().ref('items/' + itemId).set(item);
   //newItems.push(item);
   console.log('inserted');
  // $location.path('/home');

/*firebase.auth().signInWithEmailAndPassword(username, password).then(function() {
  // Sign-in successful.
  
   console.log('Authentication success');
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
});*/

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