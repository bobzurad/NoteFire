angular
  .module('NoteFire')
  .controller('HomeController', [
    '$location', 'NoteService', 'currentAuth',
    function($location, NoteService, currentAuth) {
      'use strict';

      if (!currentAuth) {
        $location.url("public");
        return;
      }

      var controller = this;

      angular.element("#newNoteLink").show();

      NoteService.init();
      controller.notes = NoteService.getNotes();

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);
