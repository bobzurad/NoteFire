(function() {
  'use strict';

  angular
    .module('NoteFire', ['ngRoute', 'firebase'])
    .constant('Constants',  {
      FirebaseConfig: {
        apiKey: 'AIzaSyBgxr7HG-wEHoq1M_pcW7OIZMys8XGbRt4',
        authDomain: 'notefireapp.firebaseapp.com',
        databaseURL: 'https://notefireapp.firebaseio.com/',
        storageBucket: 'notefireapp.appspot.com',
      }
    })
    .config(["$routeProvider", function($routeProvider) {
    	$routeProvider
        .when('/login', {
          templateUrl: 'js/templates/login.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            currentAuth: ["Auth", function(Auth) {
              // $waitForSignIn returns a promise so the resolve waits for it to complete
              return Auth.$waitForSignIn();
            }]
          }
        })
        .when('/logout', {
          templateUrl: 'js/templates/logout.html',
          controller: 'LogoutController',
          controllerAs: 'logoutCtrl',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            currentAuth: ["Auth", function(Auth) {
              // $waitForSignIn returns a promise so the resolve waits for it to complete
              return Auth.$requireSignIn();
            }]
          }
        })
      	.when('/new', {
        	templateUrl: 'js/templates/add-note.html',
          controller: 'AddNoteController',
          controllerAs: 'addNoteCtrl',
          resolve: {
            // controller will not be loaded until $requireSignIn resolves
            currentAuth: ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $routeChangeError
              return Auth.$requireSignIn();
            }]
          }
      	})
        .when('/view/:id', {
          templateUrl: 'js/templates/view-note.html',
          controller: 'ViewNoteController',
          controllerAs: 'viewNoteCtrl',
          resolve: {
            currentAuth: ["Auth", function(Auth) {
              return Auth.$waitForSignIn();
            }]
          }
        })
        .when('/edit/:id', {
          templateUrl: 'js/templates/edit-note.html',
          controller: 'EditNoteController',
          controllerAs: 'editNoteCtrl',
          resolve: {
            currentAuth: ["Auth", function(Auth) {
              return Auth.$waitForSignIn();
            }]
          }
        })
        .when('/public', {
          templateUrl: 'js/templates/public.html',
          controller: 'PublicController',
          controllerAs: 'publicCtrl'
        })
        .otherwise({
          templateUrl: 'js/templates/home.html',
          controller: 'HomeController',
          controllerAs: 'homeCtrl',
          resolve: {
            currentAuth: ["Auth", function(Auth) {
              return Auth.$waitForSignIn();
            }]
          }
        });
    }])
    .run(["$rootScope", "$location", 'Constants',
        function($rootScope, $location, Constants) {
          firebase.initializeApp(Constants.FirebaseConfig);

          $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
              $location.path("/login");
            }
          });
        }
      ]);
})();
