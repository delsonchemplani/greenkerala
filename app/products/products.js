'use strict';
 

 
 var app =angular.module('myKalahulluApp').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int        
        return input.slice(start);
    
    }
});

 
// Home controller
app.controller('ProductCtrl', ['$scope','FirebaseService','Auth',function($scope,FirebaseService,Auth) {
$scope.items=[];
 $scope.currentPage = 0;
    $scope.pageSize = 3;
    //$scope.data = [];
    $scope.numberOfPages=0
 $scope.getItems=function(){
 	//logging in 
 	console.log('here');
 	 Auth.login("admin@gmail.com","admin1234");
     var promise=FirebaseService.getItems().then ( function ( result ) {
      //  $scope.uId = result;
        console.log('Data retrieved'+result);
        $scope.items=result;
        console.log('Data retrieved2'+$scope.items.length);
 		// $scope.numberOfPages=Math.ceil($scope.items.length/$scope.pageSize); 
  
         // console.log('retrieved'+$scope.numberOfPages);
     /*	if(!$scope.$$phase) {
     	 $scope.$apply(function () {*/
            var totalItemCount=7
             $scope.numberOfPages=Math.ceil(totalItemCount/$scope.pageSize);
              //alert(result.length);
             //alert($scope.numberOfPages);
if(!$scope.$$phase) {
	$scope.$apply();}
       /*      alert($scope.numberOfPages);
        });
     	}*/
    }, function(error){
        //If an error happened, handle it here
    });
  };



   /* $scope.$watch(function() { return $scope.numberOfPages; }, function(newVal, oldVal) {
       $scope.numberOfPages = newVal;
    })*/



$scope.$watch( '$scope.numberOfPages',function(newValue, oldValue){
	console.log('$scope.numberOfPages Changed');
	console.log(newValue);
	console.log(oldValue);
	}
);
 // function ProductCtrl($scope) {
   
    /*$scope.numberOfPages=function(){
    	
    	//alert($scope.items.length);
            
                  
    }*/
   /* for (var i=0; i<45; i++) {
        $scope.data.push("Item "+i);
    }*/
//
/*app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});*/

}]);