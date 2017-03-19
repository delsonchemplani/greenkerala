'use strict';
 
angular.module('myKalahulluApp', [
    'ngRoute',
   // 'myApp.login'           // Newly added home module
]).config(['$routeProvider', function($routeProvider) {
     console.log('DHERE');
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl',
        requireLogin: false
    });

     $routeProvider.when('/', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl',
        requireLogin: true
    });

    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'MainCtrl',
        requireLogin: true
    });
     $routeProvider.otherwise({
        redirectTo: '/login'
    });
}])

.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  Auth.init();
    $rootScope.$on('$routeChangeStart', function (event) {      
        if (!Auth.isLoggedIn() ) {
            console.log('DENY');
           // event.preventDefault();
            //redirectTo: '/login'
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            //redirectTo: '/home'
            $location.path('/home');
        }
    });
    
    $rootScope.$watch(Auth.isLoggedIn, function (value, oldValue) {
//alert(value+'and'+oldValue)
    if(!value && oldValue) {
      console.log("Disconnect");
      $location.path('/login');
    }

    if(value) {
      console.log("Connect");
       $location.path('/home');
      //Do something when the user is connected
    }

  }, true);

}])
;


/*.config(['$routeProvider', function($routeProvider) {
    // Set defualt view of our app to home
     
    $routeProvider.otherwise({
        redirectTo: '/login'
    });
}]);*/