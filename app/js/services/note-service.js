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
        if (notes) {
          return notes.$remove(note);
        } else if (note.$remove) {
          return note.$remove();
        } else {
          throw new Error("error deleting note");
        }
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
        if (notes) {
          return notes.$save(note);
        } else if (note.$save) {
          return note.$save();
        } else {
          throw new Error("error saving note");
        }
      };
    }
  ]);
