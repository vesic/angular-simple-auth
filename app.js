
angular.module('app', ['ngRoute', 'firebase', 'app.auth'])

  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: './views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/secret', {
        templateUrl: './views/secret.html',
        controller: 'SecretCtrl',
        resolve: {
          isUserLoggedIn: function(Auth) {
            return Auth.isUserLoggedIn();
          }
        }
      })
      .otherwise('/');
  })

  .controller('HomeCtrl', function($scope, Auth, $window) {
    // log status
    $scope.user = Auth.isUserLoggedIn();

    $scope.logout = function($event) {
      $event.preventDefault();
      Auth.logout(function() {
        $window.location.href = '/';
      });
    }
  })

  .controller('LoginCtrl', function($scope, Auth, $window) {
    $scope.user = {};

    $scope.login = function($event) {
      $event.preventDefault();
      if (!($scope.user.email && $scope.user.password)) {
        alert('You need to enter email and/or password!')
        return;
      }
      else {
        Auth.login($scope.user.email, $scope.user.password,
          function(authData) {
            $scope.$apply(function() {
              $window.location.href = '/';
            })
          }, function() {
            $scope.$apply(function() {
              $scope.user = {}
              $scope.error = 'Wrong email and/or password!'      
            })
          })
      }  
    }
  })

  .controller('SecretCtrl', function($scope, $location, isUserLoggedIn) {
    // if not authorized redirect
    if (!isUserLoggedIn) {
      $location.path('login')
    }
  })
