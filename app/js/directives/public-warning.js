angular
  .module('NoteFire')
  .directive('publicWarning', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/public-warning.html',
      controllerAs: 'publicWarningCtrl',
      controller: ['Auth', function(Auth) {
        'use strict';

        var controller = this;

        controller.isVisible = false;

        Auth.$onAuthStateChanged(function(user) {
          controller.isVisible = !user;
        });
      }]
    };
  });
