'use strict';
 

 
 var app =angular.module('myKalahulluApp');

 
// Home controller
app.controller('ProductCtrl', ['$scope','FirebaseService',function($scope,FirebaseService) {

 $scope.getItems=function(){
     var promise=FirebaseService.getItems().then ( function ( result ) {
      //  $scope.uId = result;
        console.log('Data retrieved'+result);
        $scope.items=result;
    
  
          console.log('retrieved');
     
    }, function(error){
        //If an error happened, handle it here
    });
  };

}]);