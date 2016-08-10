angular
  .module('NoteFire')
  .controller('PublicController', [
    '$location', 'PublicNoteService',
    function($location, PublicNoteService) {
      'use strict';

      var controller = this;

      angular.element("#newNoteLink").show();

      PublicNoteService.init();
      controller.notes = PublicNoteService.getNotes();

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);
