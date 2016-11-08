angular
  .module('NoteFire')
  .controller('PublicController', [
    '$location', 'PublicNoteService',
    function($location, PublicNoteService) {
      'use strict';

      var controller = this;

      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      PublicNoteService.init();
      PublicNoteService.getNotes()
        .$loaded()
        .then(function(notes) {
          angular.element("#spinner").hide();
          controller.notes = notes.map(function(note) {
            var mappedNote = {
              id: note.$id,
              dateCreated: note.dateCreated,
              dateUpdated: note.dateUpdated,
              title: note.title,
              content: note.content
                .replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "http://...") //this regex from taken from http://stackoverflow.com/a/26764609
                .replace(/<\/?[^>]+>/gi, '')
                .replace(/&nbsp;/g," ")
                .replace(/&rsquo;/g, "'")
                .replace(/&middot;/g, "")
                .substr(0, 300)
            };

            //remove very long strings that would stretch the card on smaller screens
            var content = "";
            mappedNote.content = mappedNote.content.split(" ").map(function(word) {
              word.length > 30 ? content += "... " : content += (word + " ");
            });
            mappedNote.content = content;

            return mappedNote;
          });
        });

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);
