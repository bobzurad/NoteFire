define(
  ['underscore', 'backbone', 'models/note'],
  function(_, Backbone, Note) {
    'use strict';

    //var NotesCollection = Backbone.Firebase.Collection.extend({
    var NotesCollection = Backbone.Collection.extend({
      model: Note,

      fetch: function() { //temporary override Backbone with static data
        this.reset([
          { id: 1, content: 'here is a note', title: 'note one' },
          { id: 2, content: 'here is another note!', title: 'note two' },
          { id: 3, content: 'oh. look at this! yet, another note!', title: 'note three' },
          { id: 4, content: 'what??? another note? how many notes can this app hold?', title: 'note four' }
        ]);
      }
    });

    return new NotesCollection();
  }
);
