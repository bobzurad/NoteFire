(function() {
  'use strict';

  angular
    .module('NoteFire', ['ngRoute'])
    .config(function($routeProvider) {
    	$routeProvider
      	.when('/new', {
        	templateUrl: 'js/templates/add-note.html',
          controller: 'AddNoteController',
          controllerAs: 'addNoteCtrl'
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
