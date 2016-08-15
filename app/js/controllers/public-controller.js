angular
  .module('NoteFire')
  .controller('PublicController', [
    '$location', 'PublicNoteService',
    function($location, PublicNoteService) {
      'use strict';

      var controller = this;

      angular.element("#newNoteLink").show();

      PublicNoteService.init();
      PublicNoteService.getNotes()
        .$loaded()
        .then(function(notes) {
          controller.notes = notes.map(function(note) {
            return {
              id: note.$id,
              dateCreated: note.dateCreated,
              title: note.title,
              content: note.content.replace(/<\/?[^>]+>/gi, '').substr(0, 300)
            };
          });
        });

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);
