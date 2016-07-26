angular
  .module('NoteFire')
  .factory("Auth", [
    "$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);
