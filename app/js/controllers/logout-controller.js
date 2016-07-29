angular
  .module('NoteFire')
  .controller('LogoutController', [
    '$location', 'Auth', 'currentAuth',
    function($location, Auth, currentAuth) {
      'use strict';

      var controller = this;

      Auth.$onAuthStateChanged(function(user) {
        if (!user) {
          $location.url("login");
        }
      });

      controller.logout = function() {
        Auth.$signOut();
      };

      controller.logout();
    }
  ]);
