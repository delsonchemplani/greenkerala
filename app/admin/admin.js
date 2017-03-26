'use strict';
 

 
 angular.module('myKalahulluApp')

 
// Home controller
.controller('AdminCtrl', ['$scope',function($scope) {

  
$scope.pushItem = function(event) {
  event.preventDefault();  
  var itemId=$scope.item.itemCode;
   
       //  var sFileName = $("#imageFile").val();
    
   
  var preview = document.querySelector('img'); 
var file    = document.getElementById('imageFile').files[0];
 var storageRef = firebase.storage().ref(itemId+'/itemImages/'+file.name);
console.log('myFile'+file.name);
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);


  if (file) {
    //reader.readAsDataURL(file);
    var uploadTask= storageRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!'+snapshot.downloadURL);
    $scope.item.images={};
    $scope.item.images[0]=snapshot.downloadURL;
    });
  }
  console.log(file);

  //  console.log(sFileName)
  
   
  // var newItems = new Firebase('https://kalahullu-2064b.firebaseio.com/items');
  firebase.database().ref('items/' + itemId).set($scope.item);
   //newItems.push(item);
   console.log('inserted');
  
  


}




}]);