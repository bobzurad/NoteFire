angular
  .module('NoteFire')
  .controller('AddNoteController', [
    '$location', 'NoteService',
    function($location, NoteService) {
      'use strict';

      var controller = this;

      controller.note = {};

      angular.element("#title").focus();
      window.scrollTo(0,0);

      controller.addNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element("#saveButton").addClass("disabled");
        angular.element("#saveButton").val("Saving...");

        NoteService.addNote({
          title: controller.note.title,
          content: controller.note.content,
          dateCreated: Date.now()
        }).then(function(noteRef) {
          angular.element("#saveButton").removeClass("disabled");
          angular.element("#saveButton").val("Save Note");

          controller.note = {};

          $location.url('view/' + noteRef.key);
        });
      };
    }
  ]);
