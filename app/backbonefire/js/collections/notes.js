define(
  ['underscore', 'backbone', 'models/note', 'notefirecommon', 'firebase', 'backbonefire'],
  function(_, Backbone, Note, Common) {
    'use strict';

    var NotesCollection = Backbone.Firebase.Collection.extend({
      model: Note,

      url: Common.FirebaseUrl + 'notes'
    });

    return new NotesCollection();
  }
);
