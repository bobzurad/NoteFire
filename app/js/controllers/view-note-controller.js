angular
  .module('NoteFire')
  .controller('ViewNoteController', [
    '$routeParams', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($routeParams, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.tinymceOptions = {
        readonly: true,
        toolbar: false,
        menubar: false,
        statusbar: false,
        plugins: ["codesample"],
        setup: function(editor){
          //preserve hyperlink navigation (http://stackoverflow.com/a/34322305)
          if (editor.settings.readonly) {
            editor.on('init', function() {
              $(editor.getBody()).on('click', 'a[href]', function(e) {
                window.open($(e.currentTarget).attr('href'),'_blank');
              });
            });
          }
        }
      };

      if (currentAuth) {
        NoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
            if (note.isEncrypted) {
              controller.note.title = sjcl.decrypt(currentAuth.uid, note.title);
              controller.note.content = sjcl.decrypt(currentAuth.uid, note.content);
              controller.note.isEncrypted = false;
            }
          });
      } else {
        PublicNoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
          });
      }

      angular.element("#newNoteLink").show();
      window.scrollTo(0, 0);
    }
  ]);
