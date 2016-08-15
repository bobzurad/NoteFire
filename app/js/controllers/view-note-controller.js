angular
  .module('NoteFire')
  .controller('ViewNoteController', [
    '$routeParams', '$sce', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($routeParams, $sce, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      if (currentAuth) {
        controller.note = NoteService.getNoteById($routeParams.id);
      } else {
        controller.note = PublicNoteService.getNoteById($routeParams.id);
      }

      if (controller.note.$loaded) {
        //note may not be loaded yet
        controller.note.$loaded()
          .then(function(note) {
            controller.trustedHtml = $sce.trustAsHtml(note.content);
          });
      } else {
        controller.trustedHtml = $sce.trustAsHtml(controller.note.content);
      }

      angular.element("#newNoteLink").show();
      window.scrollTo(0, 0);
    }
  ]);
