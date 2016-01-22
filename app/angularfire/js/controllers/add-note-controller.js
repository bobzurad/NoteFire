angular
  .module('NoteFire')
  .controller('AddNoteController', [
    '$scope',
    function($scope) {
      'use strict';

      var controller = this;
      controller.note = {};

      controller.addNote = function() {
        //TODO: $scope.notes is undefined, wire this up to firebase
        $scope.notes.push({
          id: 4,
          title: controller.note.title,
          content: controller.note.content
        });
        controller.note = {};
      };
    }
  ]);
