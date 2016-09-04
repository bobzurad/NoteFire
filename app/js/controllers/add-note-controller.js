angular
  .module('NoteFire')
  .controller('AddNoteController', [
    '$location', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($location, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.note = {};
      controller.tinymceOptions = {
        removed_menuitems: 'newdocument',
        statusbar: false,
        plugins: ["autolink", "preview", "paste", "advlist", "codesample", "image",
          "imagetools", "link", "media", "nonbreaking", "pagebreak", "print", "searchreplace",
          "table", "textcolor", "textpattern"
        ],
        toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table',
        toolbar2: 'print preview | link image media | forecolor backcolor nonbreaking pagebreak | searchreplace codesample',
        image_advtab: true
      };

      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      controller.addNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element("#saveButton").addClass("disabled");
        angular.element("#saveButtonText").hide();
        angular.element("#saveButtonIcon").show();

        var note = {
          title: controller.note.title,
          content: controller.note.content,
          dateCreated: Date.now()
        };

        if (currentAuth) {
          NoteService
            .addNote(note)
            .then(addNoteCallback);
        } else {
          PublicNoteService
            .addNote(note)
            .then(addNoteCallback);
        }
      };

      function addNoteCallback(noteRef) {
        angular.element("#saveButton").removeClass("disabled");
        angular.element("#saveButtonIcon").hide();
        angular.element("#saveButtonText").show();

        controller.note = {};

        $location.url('view/' + noteRef.key);
      }
    }
  ]);
