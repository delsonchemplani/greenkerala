'use strict';
 

  var app =angular.module('myKalahulluApp');

 
// Home controller
app.controller('CartCtrl', ['$scope', '$rootScope','$filter','FirebaseService','cartService','Auth',
    function($scope, $rootScope,$filter,FirebaseService,cartService,Auth) {
$scope.cart=[];
$scope.orderItems=[];
$scope.totalPrice=0;
 $scope.itemQuantity=1;
$scope.getCartItems=function(){
          
            $scope.cart=cartService.cartItems();
            angular.forEach($scope.cart, function (cartItem) {
                    $scope.orderItems.push({"itemId":cartItem.itemCode,
                                             "itemQuantity":1,
                                             "image":cartItem.images[0],
                                              "price":cartItem.price,
                                              "desc":cartItem.desc}
                                              );
                });
            $scope.calculateTotal();
    };

$scope.deletetCartItem=function(item){
    var index = $scope.orderItems.indexOf(item);
    $scope.orderItems.splice(index, 1);
    cartService.deleteCartItem(item.itemId);
    //$scope.getCartItems();
     $scope.calculateTotal();
}

$scope.incrementQuantity=function(item){  
      
       var index = $scope.orderItems.indexOf(item);
            
    if($scope.orderItems[index].itemQuantity<3){
            $scope.orderItems[index].itemQuantity=$scope.orderItems[index].itemQuantity+1;
                    
    }
       $scope.calculateTotal();
    };
$scope.decrementQuantity=function(item){
          
      var index = $scope.orderItems.indexOf(item);
            
    if($scope.orderItems[index].itemQuantity>1){
            $scope.orderItems[index].itemQuantity=$scope.orderItems[index].itemQuantity-1;
                    
    }
          $scope.calculateTotal();   
          
      
    };

    $scope.calculateTotal=function(item){
        $scope.totalPrice=0;
    angular.forEach($scope.orderItems, function (cartItem) {
                   $scope.totalPrice=$scope.totalPrice+(cartItem.price*cartItem.itemQuantity);
                });
      
    };


}]);