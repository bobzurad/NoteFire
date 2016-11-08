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
      window.scrollTo(0,0);

      NoteService.init();
      NoteService.getNotes()
        .$loaded()
        .then(function(notes) {
          angular.element("#spinner").hide();
          controller.notes = notes.map(function(note) {
            var mappedNote = {
              id: note.$id,
              dateCreated: note.dateCreated,
              dateUpdated: note.dateUpdated,
            };
            if (note.isEncrypted) {
              mappedNote.title = sjcl.decrypt(currentAuth.uid, note.title);
              mappedNote.content = sjcl.decrypt(currentAuth.uid, note.content);
            } else {
                mappedNote.title = note.title,
                mappedNote.content = note.content;
            }
            //filter content and only show first 300 characters
            mappedNote.content = mappedNote.content.replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "http://...") //this regex from taken from http://stackoverflow.com/a/26764609
              .replace(/<\/?[^>]+>/gi, '')
              .replace(/&nbsp;/g," ")
              .replace(/&rsquo;/g, "'")
              .replace(/&middot;/g, "")
              .substr(0, 300);

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
