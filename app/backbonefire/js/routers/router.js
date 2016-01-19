define(
  ['jquery', 'backbone', 'collections/notes', 'views/home', 'views/newNote'],
  function($, Backbone, NotesCollection, HomeView, NewNoteView) {
    'use strict';

    var Router = Backbone.Router.extend({

      routes: {
        "home": "defaultRoute",
        "new": "newRoute",
        "detail/:id": "detailRoute",
        "*path": "defaultRoute"
      },

      initialize: function() {
        //this function runs on every page load
        this.HomeView = new HomeView({ collection: NotesCollection });
        this.NewNoteView = new NewNoteView();
      },

      defaultRoute: function() {
        this.HomeView.render();
      },

      newRoute: function() {
        this.NewNoteView.render();
      },

      detailRoute: function(id) {

      }

    });

    return new Router();
  }
);
