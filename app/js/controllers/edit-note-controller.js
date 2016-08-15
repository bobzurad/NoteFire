angular
  .module('NoteFire')
  .controller('EditNoteController', [
    '$routeParams', '$location', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($routeParams, $location, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.showWarning = false;
      controller.tinymceOptions = {
        removed_menuitems: 'newdocument',
        statusbar: false
      };

      if (currentAuth) {
        controller.note = NoteService.getNoteById($routeParams.id);
      } else {
        controller.note = PublicNoteService.getNoteById($routeParams.id);
      }

      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      controller.saveNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element("#saveButton").addClass("disabled");
        angular.element("#saveButtonText").hide();
        angular.element("#saveButtonIcon").show();

        if (currentAuth) {
          NoteService
            .updateNote(controller.note)
            .then(updateNoteCallback);
        } else {
          PublicNoteService
            .updateNote(controller.note)
            .then(updateNoteCallback);
        }
      };

      controller.showDeleteWarning = function() {
        controller.showWarning = true;
      };

      controller.hideDeleteWarning = function() {
        controller.showWarning = false;
      };

      controller.deleteNote = function() {
        angular.element("#deleteButtonText").hide();
        angular.element("#deleteButtonIcon").show();

        if (currentAuth) {
          NoteService
            .deleteNote(controller.note)
            .then(deleteNoteCallback);
        } else {
          PublicNoteService
            .deleteNote(controller.note)
            .then(deleteNoteCallback);
        }
      };

      function updateNoteCallback(noteRef) {
        angular.element("#saveButton").removeClass("disabled");
        angular.element("#saveButtonIcon").hide();
        angular.element("#saveButtonText").show();

        controller.note = {};
        $location.path('/view/' + noteRef.key);
      }

      function deleteNoteCallback() {
        angular.element("#deleteButtonIcon").hide();
        angular.element("#deleteButtonText").show();

        controller.note = {};
        $location.url('home');
      }
    }
  ]);
