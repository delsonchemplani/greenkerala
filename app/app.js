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
        templateUrl: 'home/home.html',
        controller: 'MainCtrl',
        requireLogin: false
    });

    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'MainCtrl',
        requireLogin: true
    });

     $routeProvider.when('/test', {
        templateUrl: 'home/test.html',
        controller: 'MainCtrl',
        requireLogin: false
    }).when('/demo', {
        templateUrl: 'home/home.html#demo',
        controller: 'MainCtrl',
        requireLogin: false
    }).when('/myCarousel', {
        templateUrl: 'home/home.html#myCarousel',
        controller: 'MainCtrl',
        requireLogin: false
    }).when('/admin', {
        templateUrl: 'admin/admin.htm',
        controller: 'AdminCtrl',
        requireLogin: false
    });
     $routeProvider.otherwise({
        redirectTo: '/login'
    });
}])

.run(['$rootScope', '$location','$route', 'Auth', function ($rootScope, $location,$route, Auth) {
  Auth.init();
    $rootScope.$on('$routeChangeStart', function (event) {    
     // console.log($route.routes); 
     console.log($location.path());
      var i;
      var routeInfo;
      //routeInfo.requireLogin=false;
     // for(i=0;i<=$route.routes.length;i++){
      for(i in $route.routes){        
       // console.log($route.routes[i]);
        if($route.routes[i].originalPath==$location.path())
        {
         // console.log('got');
          routeInfo=$route.routes[i];
          break;
        }
      }
   // alert($route.current.routes) ; 
   // alert(routeInfo.requireLogin) ; 
   if(routeInfo.requireLogin){

  

        if (!Auth.isLoggedIn() ) {
            console.log('DENY');
           // event.preventDefault();
            //redirectTo: '/login'
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            redirectTo: '$location.path()'
            //$location.path('/home');
        }

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