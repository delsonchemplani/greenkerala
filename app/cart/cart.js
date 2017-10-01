'use strict';
 

  var app =angular.module('myKalahulluApp');

 
// Home controller
app.controller('CartCtrl', ['$scope', '$rootScope','$filter','FirebaseService','cartService','Auth',
    function($scope, $rootScope,$filter,FirebaseService,cartService,Auth) {


//document.getElementById('rzp-button1').onclick = function(e){
  $scope.payViaRazor = function(e){
  var options = { "key": "rzp_test_l2uRR6MlppJyeS", 
        "amount": $scope.totalPrice*100, // 2000 paise = INR 20 
        "name": "Hirvy Fashions", 
        "description": "Payment via Razorpay", 
        "image": "../images/icon.jpeg", 
        "handler": function (response){ console.log(response);alert(response.razorpay_payment_id); }, 
        "prefill": { "name": "Harshil Mathur", 
        "email": "harshil@razorpay.com" }, 
        "notes": { "address": "Hello World" }, 
        "theme": { "color": "#F37254" } 
      }; 
   var rzp1 = new Razorpay(options); 
     rzp1.open();
      e.preventDefault(); 
    } 



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
      $rootScope.cartSize= $scope.cart.length;
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