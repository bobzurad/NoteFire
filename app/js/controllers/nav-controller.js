angular
  .module('NoteFire')
  .controller('NavController', [
    'Auth',
    function(Auth) {
      'use strict';

      var controller = this;

      Auth.$onAuthStateChanged(function(user) {
        controller.isAuthenticated = user !== null;
      });
    }
  ]);
