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
    .config(function($routeProvider) {
    	$routeProvider
      	.when('/new', {
        	templateUrl: 'js/templates/add-note.html',
          controller: 'AddNoteController',
          controllerAs: 'addNoteCtrl'
      	})
        .when('/view/:id', {
          templateUrl: 'js/templates/view-note.html',
          controller: 'ViewNoteController',
          controllerAs: 'viewNoteCtrl'
        })
        .when('/edit/:id', {
          templateUrl: 'js/templates/edit-note.html',
          controller: 'EditNoteController',
          controllerAs: 'editNoteCtrl'
        })
        .otherwise({
          templateUrl: 'js/templates/home.html',
          controller: 'HomeController',
          controllerAs: 'homeCtrl'
        });
    });
})();
