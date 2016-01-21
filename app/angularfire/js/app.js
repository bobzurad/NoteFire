(function() {
  var app = angular.module('NoteFire', []);

  app.controller('NoteCardController', function(){
    var controller = this;

    controller.notes = notes;
  });

  var notes = [
    { id: 1, title: 'First Note!', content: 'hey! first note!' },
    { id: 2, title: 'Second Note!', content: 'woohoo! a second note!' },
    { id: 3, title: 'Another note', content: 'here is another note!' }
  ];
})();
