angular
  .module('NoteFire')
  .controller('ForgotPasswordController', [
    '$location', 'Auth',
    function($location, Auth) {
      'use strict';

      var controller = this;

      controller.sendResetLink = function() {
        controller.message = '';
        showSpinner();

        Auth.$sendPasswordResetEmail(controller.email)
          .then(function() {
            hideSpinner();
            angular.element(".message").removeClass("error");
            controller.message = "Message sent. Check your inbox for a link to reset your password.";
          })
          .catch(function(error) {
            hideSpinner();
            angular.element(".message").addClass("error");
            if (error.code === "auth/user-not-found") {
              controller.message = "This email address was not found.";
            } else {
              controller.message = error.message;
            }
          });
      };

      function showSpinner() {
        angular.element("#resetButtonText").hide();
        angular.element("#resetButtonIcon").show();
      }

      function hideSpinner() {
        angular.element("#resetButtonIcon").hide();
        angular.element("#resetButtonText").show();
      }
    }
  ]);
