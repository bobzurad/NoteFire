angular
  .module('NoteFire')
  .service('NoteService', [
    '$firebaseArray', '$firebaseObject', 'Auth',
    function($firebaseArray, $firebaseObject, Auth) {
      'use strict';

      //init
      var NoteService = this,
        notes;

      //public functions
      NoteService.init = function(refPath) {
        if (!refPath) {
          var user = Auth.$getAuth();

          if (user) {
            refPath = firebase.database().ref('notes/' + user.uid);
          } else {
            refPath = 'notes/public';
          }
        }

        notes = $firebaseArray(refPath);
      };

      NoteService.close = function() {
        notes.$destroy();
      };

      NoteService.getNotes = function() {
        return notes;
      };

      NoteService.addNote = function(note) {
        return notes.$add(note);
      };

      NoteService.deleteNote = function(note) {
        notes.$remove(note);
      };

      NoteService.getNoteById = function(id) {
        if (notes) {
          return notes.$getRecord(id);
        } else {
          var user = Auth.$getAuth();
          var ref = firebase.database().ref('notes/' + user.uid + '/' + id);
          return $firebaseObject(ref);
        }
      };

      NoteService.updateNote = function(note) {
        notes.$save(note);
      };
    }
  ]);
