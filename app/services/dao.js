 angular.module('myKalahulluApp').factory('FirebaseService', function($q,$window){

  //$scope.cart={};
  
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
    db.collection("scrapitems").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

    deferred.resolve(querySnapshot);
});


   /*  var storageItemsRef = firebase.app().database().ref("scrapitems");
     //var itemsRef=storageItemsRef.child("222");
        // deferred.resolve(itemsRef);
     storageItemsRef.on('value', function(snapshot) {
      deferred.resolve(snapshot.val());
    });
           
*/
    return deferred.promise;
  }
//getting orderItems from cart
     function getOrderItems() {
    var deferred = $q.defer();
    console.log('started');

     var storageItemsRef = firebase.database().ref("orderItems");
     //var itemsRef=storageItemsRef.child("222");
        // deferred.resolve(itemsRef);
     storageItemsRef.on('value', function(snapshot) {
      deferred.resolve(snapshot.val());
    });         

    return deferred.promise;
  }

//push order Item to table
  function pushOrderItems() {
    var deferred = $q.defer();
    console.log('pusing order started');
    var orderId=$scope.custName+'_'+$scope.itemId //random number needs to be generated

    var orderItems={
      "orderId":orderId,
      "custName":$scope.custName,
      "shippingAddress":$scope.shippingAddress,
      "orderedItems":$scope.cart, //itemid ,quantity,price {object list}
      "mobileNumber":$scope.mobileNumber,
      "paymentMethod":$scope.paymentMethod,
      "paymentStatus":$scope.paymentStatus
    }
        firebase.database().ref('orderItems/' + orderId).set(orderItems);
  
          console.log('order inserted');
       

    return deferred.promise;
  }

//update instock quantity in item table
//TODO


  return{
		pushFile:pushFile,
    getItems:getItems

  };

});