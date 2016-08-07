angular
  .module('NoteFire')
  .controller('LogoutController', [
    '$location', 'Auth', 'currentAuth', 'NoteService',
    function($location, Auth, currentAuth, NoteService) {
      'use strict';

      var controller = this;

      Auth.$onAuthStateChanged(function(user) {
        if (!user) {
          $location.url("login");
        }
      });

      controller.logout = function() {
        NoteService.close();
        Auth.$signOut();
      };

      controller.logout();
    }
  ]);
