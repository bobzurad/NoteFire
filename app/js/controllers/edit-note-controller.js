angular
  .module('NoteFire')
  .controller('EditNoteController', [
    '$routeParams', '$location', 'NoteService', 'PublicNoteService', 'currentAuth','Constants',
    function($routeParams, $location, NoteService, PublicNoteService, currentAuth, Constants) {
      'use strict';

      var controller = this;

      controller.showWarning = false;
      controller.tinymceOptions = Constants.TinyMceOptions;

      if (currentAuth) {
        NoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
            if (note.isEncrypted) {
              controller.note.title = sjcl.decrypt(currentAuth.uid, note.title);
              controller.note.content = sjcl.decrypt(currentAuth.uid, note.content);
              controller.note.isEncrypted = false;
            }
            //these values used by the view to prevent user from seeing encryption while saving note
            controller.noteTitle = controller.note.title;
            controller.noteContent = controller.note.content;
          });
      } else {
        PublicNoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
            controller.noteTitle = controller.note.title;
            controller.noteContent = controller.note.content;
          });
      }

      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      controller.saveNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element(".saveButton").addClass("disabled");
        angular.element(".saveButtonText").hide();
        angular.element(".saveButtonIcon").show();

        controller.note.title = controller.noteTitle;
        controller.note.content = controller.noteContent;

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
        angular.element(".saveButton").removeClass("disabled");
        angular.element(".saveButtonIcon").hide();
        angular.element(".saveButtonText").show();

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
