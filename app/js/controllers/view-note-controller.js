angular
  .module('NoteFire')
  .controller('ViewNoteController', [
    '$routeParams', 'NoteService', 'currentAuth',
    function($routeParams, NoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.note = NoteService.getNoteById($routeParams.id);

      window.scrollTo(0, 0);      
    }
  ]);
