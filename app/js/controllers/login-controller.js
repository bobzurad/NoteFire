angular
  .module('NoteFire')
  .controller('LoginController', [
    '$location', 'currentAuth',
    function($location, currentAuth) {
      'use strict';

      var controller = this;

      //hack to make bootstrap tabs work with Angular
      angular.element('#loginTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });

      controller.signin = function() {
        
      };

      controller.register = function() {

      };
    }
  ]);
