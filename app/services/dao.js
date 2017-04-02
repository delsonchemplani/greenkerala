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


  return{
		pushFile:pushFile

  };

});