angular
  .module('NoteFire')
  .controller('EditNoteController', [
    '$scope', '$routeParams',
    function($scope, $routeParams) {
      'use strict';

      var controller = this;

      //TODO: $scope.notes is undefined, wire this up to firebase
      controller.note = $scope.notes.find($routeParams.id);

      controller.saveNote = function() {
        $scope.notes.find(controller.note.id);
        controller.note = {};
      };
    }
  ]);
