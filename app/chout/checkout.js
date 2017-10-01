/*'use strict';
 

 
 var app =angular.module('myKalahulluApp');

 
// Home controller
app.controller('CheckoutCtrl', ['$scope','FirebaseService',function($scope,FirebaseService) {




 //future method
 $scope.getOrderItems=function(){
     var promise=FirebaseService.getOrderItems().then ( function ( result ) {
      //  $scope.uId = result;
        console.log('Data retrieved'+result);
        $scope.items=result;
    
  
          console.log('retrieved');
     
    }, function(error){
        //If an error happened, handle it here
    });
  };

}]);*/