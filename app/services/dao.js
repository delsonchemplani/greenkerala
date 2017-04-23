 angular.module('myKalahulluApp').factory('FirebaseService', function($q,$window){


 function pushFile(itemId,file) {
    var deferred = $q.defer();
    console.log('started');

     var storageRef = firebase.storage().ref(itemId+'/swatchImages/'+file.name);
          console.log('myFile'+file.name);       

          if (file) {    
            var uploadTask= storageRef.put(file).then(function(snapshot) {
           		 console.log('Uploaded a blob or file!'+snapshot.downloadURL);            
           		// $scope.item.images[1]=snapshot.downloadURL;
           		 
           		 deferred.resolve(snapshot.downloadURL);
            }, function(error) {
    			  deferred.reject(error);
    	});
          }
             

    return deferred.promise;
  }


   function getItems() {
    var deferred = $q.defer();
    console.log('started');

     var storageItemsRef = firebase.database().ref("items");
     //var itemsRef=storageItemsRef.child("222");
        // deferred.resolve(itemsRef);
     storageItemsRef.on('value', function(snapshot) {
      deferred.resolve(snapshot.val());
    });
           

    return deferred.promise;
  }



  return{
		pushFile:pushFile,
    getItems:getItems

  };

});