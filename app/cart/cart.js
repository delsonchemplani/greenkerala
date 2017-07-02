'use strict';
 

  var app =angular.module('myKalahulluApp');

 
// Home controller
app.controller('CartCtrl', ['$scope', '$rootScope','$filter','FirebaseService','cartService','Auth',
    function($scope, $rootScope,$filter,FirebaseService,cartService,Auth) {
$scope.cart=[];

$scope.getCartItems=function(){
            console.log('here');
            //alert('here');
           // alert(item.itemCode);
            $scope.cart=cartService.cartItems();
      
    };


}]);