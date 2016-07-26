angular
  .module('NoteFire')
  .controller('HomeController', [
    '$location', 'NoteService', 'currentAuth',
    function($location, NoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.notes = NoteService.getNotes();

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);
