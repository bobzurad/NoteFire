angular
  .module('NoteFire')
  .controller('EditNoteController', [
    '$routeParams', '$location', 'NoteService', 'currentAuth',
    function($routeParams, $location, NoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.showWarning = false;
      controller.note = NoteService.getNoteById($routeParams.id);

      angular.element("#content").focus();
      window.scrollTo(0,0);

      controller.saveNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }
        var id = controller.note.$id;
        NoteService.updateNote(controller.note);
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
        NoteService.deleteNote(controller.note);
        controller.note = {};
        $location.url('/');
      };
    }
  ]);
