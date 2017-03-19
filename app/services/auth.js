 angular.module('myKalahulluApp').factory('Auth', function($q,$window){


var userInfo;



  function login(userName, password) {
    var deferred = $q.defer();
    console.log('started');
    firebase.auth().signInWithEmailAndPassword(userName, password).then(function(result) {
     // 
     var tokenID = firebase.auth().currentUser.getToken(true);
    // alert(accessToken);
      userInfo = {
         accessToken: tokenID,
        userName: userName
      };
    //  $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

return{
    setUser : function(aUser){
        userInfo = aUser;
    },
    isLoggedIn : function(){
        return(userInfo)? userInfo : false;
    },

    login: login,
    init:function init() {
        if ($window.sessionStorage["userInfo"]) {
           console.log('getting  session');
          userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
}
  };
})