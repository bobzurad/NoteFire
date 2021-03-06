(function() {
  'use strict';

  angular
    .module('NoteFire', ['ngRoute', 'ngSanitize', 'firebase', 'ui.tinymce'])
    .constant('Constants',  {
      FirebaseConfig: {
        apiKey: 'AIzaSyBgxr7HG-wEHoq1M_pcW7OIZMys8XGbRt4',
        authDomain: 'notefireapp.firebaseapp.com',
        databaseURL: 'https://notefireapp.firebaseio.com/',
        storageBucket: 'notefireapp.appspot.com',
      },
      TinyMceOptions: {
        removed_menuitems: 'newdocument',
        statusbar: false,
        plugins: ["autolink", "autoresize", "preview", "paste", "lists", "advlist", "codesample", "image",
          "imagetools", "link", "media", "nonbreaking", "pagebreak", "print", "searchreplace",
          "table", "textcolor", "textpattern"
        ],
        toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table',
        toolbar2: 'print preview | link image media | forecolor backcolor nonbreaking pagebreak | searchreplace codesample',
        image_advtab: true
      }
    })
    .config(["$routeProvider", function($routeProvider) {
    	$routeProvider
        .when('/home', {
          templateUrl: 'js/templates/home.html',
          controller: 'HomeController',
          controllerAs: 'homeCtrl',
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
              return Auth.$waitForSignIn();
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
        .when('/forgotPassword', {
          templateUrl: 'js/templates/forgot-password.html',
          controller: 'ForgotPasswordController',
          controllerAs: 'forgotPasswordCtrl'
        })
        .otherwise({
          templateUrl: 'js/templates/login.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl',
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
