'use strict';
 

 
 angular.module('myKalahulluApp')

 
// Home controller
.controller('AdminCtrl', ['$scope',function($scope) {

  
$scope.pushItem = function(event) {
  event.preventDefault();  
   
     
    console.log($scope.item)
  
   var itemId=$scope.item.itemCode;
  // var newItems = new Firebase('https://kalahullu-2064b.firebaseio.com/items');
  firebase.database().ref('items/' + itemId).set($scope.item);
   //newItems.push(item);
   console.log('inserted');
  
  


}




}]);