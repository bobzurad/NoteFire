angular
  .module('NoteFire')
  .controller('LoginController', [
    '$location', 'Auth', 'NoteService',
    function($location, Auth, NoteService) {
      'use strict';

      var controller = this;

      //if user is already authenticated, redirect them home
      if (Auth.$getAuth()) {
        $location.url('home');
      }

      if ($location.search().register) {
        $("#loginTabs a:last").tab('show');
      }

      angular.element("#newNoteLink").hide();

      //hack to make bootstrap tabs work with Angular
      angular.element('#loginTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });

      controller.signin = function() {
        controller.signinError = null;
        showSpinnerOnSigninButton();

        Auth.$signInWithEmailAndPassword(controller.email, controller.password)
          .then(function(user) {
            hideSpinnerOnSigninButton();
            $location.url("home");
          })
          .catch(function(error) {
            hideSpinnerOnSigninButton();
            if (error.code === "auth/user-not-found") {
              controller.signinError = "Email Address Not Found";
            } else if (error.code === "auth/wrong-password"){
              controller.signinError = "Invalid Password";
            } else {
              controller.signinError = error.message;
            }
          });
      };

      controller.register = function() {
        controller.registerError = null;

        if (controller.password !== controller.confirmPassword) {
          controller.registerError = "Passwords do not match";
          return;
        }

        showSpinnerOnRegisterButton();

        Auth.$createUserWithEmailAndPassword(controller.email, controller.password)
          .then(function(user) {
            //after creating the user, create their first note
            var ref = firebase.database().ref('notes/' + user.uid);
            NoteService.init(ref);
            NoteService.addNote({
              title: 'Your First Note!',
              content: 'Welcome to FireNote!',
              dateCreated: Date.now()
            })
            .then(function() {
              //everything is awesome. cleanup and redirect to home
              hideSpinnerOnRegisterButton();
              $location.path("home");
            })
            .catch(function(error) {
              //error creating note
              hideSpinnerOnRegisterButton();
              controller.registerError = error.message;
            });
          })
          .catch(function(error) {
            //error creating user
            hideSpinnerOnRegisterButton();
            controller.registerError = error.message;
          });
      };

      function showSpinnerOnSigninButton() {
        angular.element("#signinButton").addClass("disabled");
        angular.element("#signinButtonText").hide();
        angular.element("#signinButtonIcon").show();
      }

      function hideSpinnerOnSigninButton() {
        angular.element("#signinButton").removeClass("disabled");
        angular.element("#signinButtonIcon").hide();
        angular.element("#signinButtonText").show();
      }

      function showSpinnerOnRegisterButton() {
        angular.element("#registerButton").addClass("disabled");
        angular.element("#registerButtonText").hide();
        angular.element("#registerButtonIcon").show();
      }

      function hideSpinnerOnRegisterButton() {
        angular.element("#registerButton").removeClass("disabled");
        angular.element("#registerButtonIcon").hide();
        angular.element("#registerButtonText").show();
      }
    }
  ]);
