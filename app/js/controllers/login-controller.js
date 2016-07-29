angular
  .module('NoteFire')
  .controller('LoginController', [
    '$location', 'Auth',
    function($location, Auth) {
      'use strict';

      var controller = this;

      //if user is already authenticated, redirect them home
      if (Auth.$getAuth()) {
        $location.url('home');
      }
      //hack to make bootstrap tabs work with Angular
      angular.element('#loginTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });

      controller.signin = function() {
        controller.error = null;

        Auth.$signInWithEmailAndPassword(controller.email, controller.password)
          .then(function(user) {
            $location.url("home");
          })
          .catch(function(error) {
            if (error.code === "auth/user-not-found") {
              controller.error = "Email Address Not Found";
            } else if (error.code === "auth/wrong-password"){
              controller.error = "Invalid Password";
            } else {
              controller.error = error.message;
            }
          });
      };

      controller.register = function() {

      };
    }
  ]);
