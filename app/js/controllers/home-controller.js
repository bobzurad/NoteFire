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
      NoteService.getNotes()
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
