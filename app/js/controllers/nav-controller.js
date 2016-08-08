angular
  .module('NoteFire')
  .controller('NavController', [
    'Auth',
    function(Auth) {
      'use strict';

      var controller = this;

      Auth.$onAuthStateChanged(function(user) {
        //show or hide links in navbar
        if (user) {
          angular.element(".isNotAuthenticated").hide();
          angular.element(".isAuthenticated").show();
        } else {
          angular.element(".isAuthenticated").hide();
          angular.element(".isNotAuthenticated").show();
        }
      });
    }
  ]);
