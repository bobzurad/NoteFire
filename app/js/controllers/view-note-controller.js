angular
  .module('NoteFire')
  .controller('ViewNoteController', [
    '$routeParams', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($routeParams, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      if (currentAuth) {
        controller.note = NoteService.getNoteById($routeParams.id);
      } else {
        controller.note = PublicNoteService.getNoteById($routeParams.id);
      }

      angular.element("#newNoteLink").show();
      window.scrollTo(0, 0);
    }
  ]);
