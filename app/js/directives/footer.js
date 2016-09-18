angular
  .module('NoteFire')
  .directive('notefireFooter', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/footer.html'
    };
  });
