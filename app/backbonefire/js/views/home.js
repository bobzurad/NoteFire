define(
  ['jquery', 'underscore', 'backbone', 'text!templates/home.html', 'views/note'],
  function($, _, Backbone, homeTemplate, NoteView) {
    'use strict';

    var HomeView = Backbone.View.extend({
      el: '#viewContainer',

      template: _.template(homeTemplate),

      //this runs on page load
      initialize: function() {

      },

      render: function() {
        this.$el.html(this.template());
        this.listenTo(this.collection, 'sync', this.renderNotes);
        this.$noteViewsContainer = $("#noteViewsContainer");

        if (this.$noteViewsContainer.children().length === 0 && this.collection.length > 0) {
          this.renderNotes();
        }

        return this;
      },

      renderNotes: function() {
        var self = this;

        this.$noteViewsContainer.empty();

        this.collection.each(function(note) {
          var view = new NoteView({ model: note });
          self.$noteViewsContainer.append(view.render().el);
        });
      }

    });

    return HomeView;
  }
);
