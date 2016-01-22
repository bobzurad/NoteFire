angular
  .module('NoteFire')
  .controller('HomeController', [
    '$scope', '$location',
    function($scope, $location) {
      'use strict';

      var controller = this;

      $scope.notes = [
        { id: 1, title: 'First Note!', content: 'hey! first note!' },
        { id: 2, title: 'Second Note!', content: 'woohoo! a second note!' },
        { id: 3, title: 'Another note', content: 'here is another note!' }
      ];

      controller.notes = $scope.notes;

      controller.onCardClick = function(id) {
        $location.url('edit/' + id);
      };
    }
  ]);
