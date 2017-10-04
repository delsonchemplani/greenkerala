'use strict';
 

 
 var app =angular.module('myKalahulluApp').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int        
        return input.slice(start);
    
    }
});

 
// Home controller
app.controller('ProductCtrl', ['$scope', '$rootScope','$filter','FirebaseService','cartService','Auth',function($scope, $rootScope,$filter,FirebaseService,cartService,Auth) {
$scope.items=[];
$scope.cart=[];
if((localStorage.getItem('cart'))){              
                $scope.cart=JSON.parse( localStorage.getItem('cart'));
                $rootScope.cartSize= $scope.cart.length;
            }
$rootScope.test="121"
$scope.filterItems=[];
 $scope.currentPage = 0;
    $scope.pageSize = 6;
    //$scope.data = [];
    $scope.numberOfPages=0

$scope.addToCart=function(item){
            console.log('here');
           // alert(item.itemCode);
            cartService.addCartItem(item);
            if((localStorage.getItem('cart'))){              
              $scope.cart=JSON.parse( localStorage.getItem('cart'));
              //alert('here'+$scope.cart.length)
              $rootScope.cartSize= $scope.cart.length;
            }
    
    };

$scope.sizeCheckBoxes = [
      {label: "36", val: false},
      {label: "38", val: false},
      {label: "40", val: false},
      {label: "42", val: false},
      {label: "44", val: false},
      {label: "46", val: false},
    ];

$scope.occasionCheckBoxes = [
      {label: "Formal", val: false},
      {label: "Casual", val: false}      
    ];

    $scope.$watch('sizeCheckBoxes', function (newObj, oldObj) {
        $scope.sizesSelected=[];
         var checked = $filter('filter')(newObj, {'val': true}); //checked list
        var unchecked = $filter('filter')(newObj, {'val': false}); //unchecked list
        console.log(checked);
        console.log(unchecked);
         for (var i=0; i< checked.length; i++) {
            $scope.sizesSelected.push(checked[i].label); //adding checked labels to type array 
        }
        console.log($scope.sizesSelected);
        }, true);


    $scope.$watch('occasionCheckBoxes', function (newObj, oldObj) {
        $scope.occasionSelected=[];
         var checked = $filter('filter')(newObj, {'val': true}); //checked list
        var unchecked = $filter('filter')(newObj, {'val': false}); //unchecked list
        console.log(checked);
        console.log(unchecked);
         for (var i=0; i< checked.length; i++) {
            $scope.occasionSelected.push(checked[i].label); //adding checked labels to type array 
        }
        console.log($scope.occasionSelected);
        }, true);



    $scope.searchForItems=function(){
            console.log('here');
             console.log($scope.occasionSelected);
               console.log($scope.sizesSelected);
              var totalItems= $filter('toArray')($scope.items);

         for (var i=0; i< totalItems.length; i++) {
            $scope.filterItems.push(totalItems[i]);
             //adding checked labels to type array 
        }
        $scope.numberOfPages=Math.ceil(totalItems.length/$scope.pageSize);
            $scope.allResult=false;
    $scope.filterResult=true;
        console.log(totalItems.length);
    };


 $scope.getItems=function(){
 	//logging in 
 	console.log('here');
 	$scope.allResult=true;
    $scope.filterResult=false;
     var promise=FirebaseService.getItems().then ( function ( result ) {
      //  $scope.uId = result;
        console.log('Data retrieved'+result);
        $scope.itemsLoaded=true;
        $scope.items=result;
        console.log('Data retrieved2'+$scope.items.length);
 		// $scope.numberOfPages=Math.ceil($scope.items.length/$scope.pageSize); 
  
         // console.log('retrieved'+$scope.numberOfPages);
     /*	if(!$scope.$$phase) {
     	 $scope.$apply(function () {*/
             var totalItems= $filter('toArray')($scope.items);
             $scope.numberOfPages=Math.ceil(totalItems.length/$scope.pageSize);
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


}]);