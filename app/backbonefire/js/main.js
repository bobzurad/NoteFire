/*global require*/
(function() {
  'use strict';

  //hack to fix Bootstrap 4 alpha 2 requiring window.Tether
  require(
    ['tether'],
    function(Tether) {
      window.Tether = Tether;
    }
  );

  // Require.js config for NoteFire app
  require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
      underscore: { exports: '_' },
      backbone: {
        deps: [ 'underscore','jquery'],
        exports: 'Backbone'
      },
      tether: { exports: 'Tether' },
      bootstrap : { deps: ['jquery'] },
//      backbonefire: { deps: ['backbone'] },
    },
    paths: {
      jquery: '../../common/libs/jquery/jquery',
      tether: '../../common/libs/tether/js/tether',
      bootstrap: '../../common/libs/bootstrap/js/bootstrap',
      underscore: '../libs/underscore/underscore',
      backbone: '../libs/backbone/backbone',
      text: '../libs/requirejs/text',
//      firebase: '../libs/firebase-debug',
//      backbonefire: '../libs/backbonefire',
    }
  });

  //main require for NoteFire app
  require(
    ['backbone', 'routers/router', 'bootstrap'],
    function (Backbone, Workspace) {
      //Initialize and start NoteFire app
      new Workspace();
      Backbone.history.start();
    }
  );
}());
