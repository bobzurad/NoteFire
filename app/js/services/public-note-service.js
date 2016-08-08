angular
  .module('NoteFire')
  .service('PublicNoteService', [
    '$firebaseArray', '$firebaseObject',
    function($firebaseArray, $firebaseObject) {
      'use strict';

      //init
      var PublicNoteService = this,
        notes;

      //public functions
      PublicNoteService.init = function() {
        notes = $firebaseArray(firebase.database().ref('notes/public'));
      };

      PublicNoteService.getNotes = function() {
        return notes;
      };

      PublicNoteService.addNote = function(note) {
        return notes.$add(note);
      };

      PublicNoteService.deleteNote = function(note) {
        notes.$remove(note);
      };

      PublicNoteService.getNoteById = function(id) {
        if (notes) {
          return notes.$getRecord(id);
        } else {
          var ref = firebase.database().ref('notes/public/' + id);
          return $firebaseObject(ref);
        }
      };

      PublicNoteService.updateNote = function(note) {
        notes.$save(note);
      };
    }
  ]);
