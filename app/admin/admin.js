'use strict';
 

 
 var app =angular.module('myKalahulluApp');

 
// Home controller
app.controller('AdminCtrl', ['$scope','FirebaseService',function($scope,FirebaseService) {

  $scope.item={};
  $scope.item.images={};
  $scope.files = []; 

$scope.pushSwatchImages=function(){
    alert($scope.files.length+" files selected ... Write your Upload Code"); 
    var itemId=$scope.item.itemCode;  
    var i=1;
    angular.forEach($scope.files,function(file,index){             

   
         FirebaseService.pushFile(itemId,file._file);
     /*     var storageRef = firebase.storage().ref(itemId+'/swatchImages/'+file.name);
          console.log('myFile'+file._file.name);       

          if (file._file) {    
            var uploadTask= storageRef.put(file._file).then(function(snapshot) {
            console.log('Uploaded a blob or file!'+snapshot.downloadURL);            
            $scope.item.images[i]=snapshot.downloadURL;
            i++;
            });;
          }
             console.log('Swatch image Uploaded successfully'+file);*/



        });

     console.log('Done');
    
  };


  
$scope.pushItem = function(event) {
 
//  $scope.pushMainImage();
//  $scope.pushSwatchImages();

   var itemId=$scope.item.itemCode; 
var i=0;
  var file = document.getElementById('imageFile').files[0];
 var promise=FirebaseService.pushFile(itemId,file).then ( function ( result ) {
      //  $scope.uId = result;
        console.log('Data Inserted'+result);
        $scope.item.images[i]=result;




        firebase.database().ref('items/' + itemId).set($scope.item);
  
          console.log('inserted');
     
    }, function(error){
        //If an error happened, handle it here
    });;
  
 


            
  
  


}


$scope.pushMainImage = function(event) {
  //event.preventDefault();  
  var itemId=$scope.item.itemCode; 
  var file = document.getElementById('imageFile').files[0];
 var promise=FirebaseService.pushFile(itemId,file);
 console.log('data returned from service'+promise);

 /*
  var preview = document.querySelector('img'); 
  var file    = document.getElementById('imageFile').files[0];
  var storageRef = firebase.storage().ref(itemId+'/mainImages/'+file.name);
  console.log('myFile'+file.name);
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);


  if (file) {
    console.log('Started') ;
    var uploadTask= storageRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!'+snapshot.downloadURL);    
    $scope.item.images[0]=snapshot.downloadURL;
    });
  }
  console.log('Uploaded successfully'+file);
*/
 
  
  


}



}]);


app.directive('ngFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                       // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);