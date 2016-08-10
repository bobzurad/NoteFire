angular
  .module('NoteFire')
  .controller('AddNoteController', [
    '$location', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($location, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.note = {};

      angular.element("#title").focus();
      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      controller.addNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element("#saveButton").addClass("disabled");
        angular.element("#saveButton").val("Saving...");

        var note = {
          title: controller.note.title,
          content: controller.note.content,
          dateCreated: Date.now()
        };

        if (currentAuth) {
          NoteService
            .addNote(note)
            .then(addNoteCallback);
        } else {
          PublicNoteService
            .addNote(note)
            .then(addNoteCallback);
        }
      };

      function addNoteCallback(noteRef) {
        angular.element("#saveButton").removeClass("disabled");
        angular.element("#saveButton").val("Save Note");

        controller.note = {};

        $location.url('view/' + noteRef.key);
      }
    }
  ]);
