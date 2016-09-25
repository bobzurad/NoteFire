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
          angular.element("#spinner").hide();
          controller.notes = notes.map(function(note) {
            if (note.isEncrypted) {
              return {
                id: note.$id,
                dateCreated: note.dateCreated,
                title: sjcl.decrypt(currentAuth.uid, note.title),
                content: sjcl.decrypt(currentAuth.uid, note.content)
                  .replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "http://...") //this regex from taken from http://stackoverflow.com/a/26764609
                  .replace(/<\/?[^>]+>/gi, '')
                  .replace(/&nbsp;/g," ")
                  .replace(/&rsquo;/g, "'")
                  .replace(/&middot;/g, "")
                  .substr(0, 300)
              };
            } else {
              return {
                id: note.$id,
                dateCreated: note.dateCreated,
                title: note.title,
                content: note.content
                  .replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "http://...") //this regex from taken from http://stackoverflow.com/a/26764609
                  .replace(/<\/?[^>]+>/gi, '')
                  .replace(/&nbsp;/g," ")
                  .replace(/&rsquo;/g, "'")
                  .replace(/&middot;/g, "")
                  .substr(0, 300)
              };
            }
          });
        });

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);
