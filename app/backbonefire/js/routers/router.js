define(
  ['jquery', 'backbone'],
  function($, Backbone) {
    'use strict';

    var Workspace = Backbone.Router.extend({

      routes: {
        "home": "defaultRoute",
        "new": "newRoute",
        "detail/:id": "detailRoute",
        "*path": "defaultRoute"
      },

      initialize: function() {
        //this function runs on every page load

      },

      defaultRoute: function() {

      },

      newRoute: function() {

      },

      detailRoute: function(id) {

      }

    });

    return Workspace;
  }
);
