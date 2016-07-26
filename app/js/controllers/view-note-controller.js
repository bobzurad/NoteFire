angular
  .module('NoteFire')
  .controller('ViewNoteController', [
    '$routeParams', 'NoteService', 'currentAuth',
    function($routeParams, NoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.note = NoteService.getNoteById($routeParams.id);
      window.scrollTo(0, 0);

      if (controller.note === null) {
        //note either doesn't exist the array isn't loaded yet.
        NoteService.getNotes().$loaded().then(function(data) {
          controller.note = data.$getRecord($routeParams.id);
        });
      }
    }
  ]);
