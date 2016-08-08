angular
  .module('NoteFire')
  .controller('EditNoteController', [
    '$routeParams', '$location', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($routeParams, $location, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.showWarning = false;

      if (currentAuth) {
        controller.note = NoteService.getNoteById($routeParams.id);
      } else {
        controller.note = PublicNoteService.getNoteById($routeParams.id);
      }

      angular.element("#content").focus();
      window.scrollTo(0,0);

      controller.saveNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }
        var id = controller.note.$id;
        if (currentAuth) {
          NoteService.updateNote(controller.note);
        } else {
          PublicNoteService.updateNote(controller.note);
        }
        controller.note = {};
        $location.path('/view/' + id);
      };

      controller.showDeleteWarning = function() {
        controller.showWarning = true;
      };

      controller.hideDeleteWarning = function() {
        controller.showWarning = false;
      };

      controller.deleteNote = function() {
        if (currentAuth) {
          NoteService.deleteNote(controller.note);
        } else {
          PublicNoteService.deleteNote(controller.note);
        }
        controller.note = {};
        $location.url('/');
      };
    }
  ]);
