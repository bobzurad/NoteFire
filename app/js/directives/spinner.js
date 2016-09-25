angular
  .module('NoteFire')
  .directive('spinner', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/spinner.html'
    };
  });
