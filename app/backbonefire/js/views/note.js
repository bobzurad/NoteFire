define(
  ['jquery', 'underscore', 'backbone', 'text!templates/note.html'],
  function($, _, Backbone, noteTemplate) {
    'use strict';

    var NoteView = Backbone.View.extend({

      template: _.template(noteTemplate),

      //this runs on page load
      initialize: function() {

      },

      render: function() {
        this.$el.html(this.template({ model: this.model.attributes }));

        return this;
      }
    });

    return NoteView;
  }
);
