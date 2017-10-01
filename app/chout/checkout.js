'use strict';
 

 
 var app =angular.module('myKalahulluApp');

 
// Home controller
app.controller('CheckoutCtrl', ['$scope','FirebaseService',function($scope,FirebaseService) {


var options = { "key": "YOUR_KEY_ID", 
				"amount": "2000", // 2000 paise = INR 20 
				"name": "Merchant Name", 
				"description": "Purchase Description", 
				"image": "/your_logo.png", 
				"handler": function (response){ alert(response.razorpay_payment_id); }, 
				"prefill": { "name": "Harshil Mathur", 
				"email": "harshil@razorpay.com" }, 
				"notes": { "address": "Hello World" }, 
				"theme": { "color": "#F37254" } 
			}; 
var rzp1 = new Razorpay(options); 
document.getElementById('rzp-button1').onclick = function(e){
	alert('hi');
		 rzp1.open(); e.preventDefault(); } 

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

}]);