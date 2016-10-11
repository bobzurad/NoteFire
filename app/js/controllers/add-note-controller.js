angular
  .module('NoteFire')
  .controller('AddNoteController', [
    '$location', 'NoteService', 'PublicNoteService', 'currentAuth', 'Constants',
    function($location, NoteService, PublicNoteService, currentAuth, Constants) {
      'use strict';

      var controller = this;

      controller.note = {};
      controller.tinymceOptions = Constants.TinyMceOptions;

      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      controller.addNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element(".saveButton").addClass("disabled");
        angular.element(".saveButtonText").hide();
        angular.element(".saveButtonIcon").show();

        var note = {
          title: controller.note.title,
          content: controller.note.content,
          dateCreated: Date.now(),
          dateUpdated: Date.now()
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
        angular.element(".saveButton").removeClass("disabled");
        angular.element(".saveButtonIcon").hide();
        angular.element(".saveButtonText").show();

        controller.note = {};

        $location.url('view/' + noteRef.key);
      }
    }
  ]);
