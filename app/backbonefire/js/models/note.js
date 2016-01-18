define(
  ['underscore', 'backbone'],
  function(_, Backbone) {
    'use strict';

    var Note = Backbone.Model.extend({
      validate: function(attrs, options) {
        var errors = [];

        if (attrs.title.length === 0) {
          errors.push({ attr: "title", msg: "Title is required." });
        }

        if (attrs.content.length === 0) {
          errors.push({ attr: "content", msg: "Content is required." });
        }

        if (errors.length > 0) {
          return errors;
        }
      }
    });

    return Note;
  }
);
