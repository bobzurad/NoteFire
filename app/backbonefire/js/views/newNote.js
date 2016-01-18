define(
  ['jquery', 'underscore', 'backbone', 'text!templates/newNote.html'],
  function($, _, Backbone, newNoteTemplate) {
    'use strict';

    var NewNoteView = Backbone.View.extend({
      el: '#viewContainer',

      template: _.template(newNoteTemplate),

      //this runs on page load
      initialize: function() {

      },

      render: function() {
        this.$el.html(this.template({ model: this.model.attributes }));

        return this;
      }
    });

    return NewNoteView;
  }
);
