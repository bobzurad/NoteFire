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
        if (notes) {
          return notes.$add(note);
        } else {
          var ref = firebase.database().ref('notes/public');
          var fbNotes = $firebaseArray(ref);

          return fbNotes.$add(note);
        }
      };

      PublicNoteService.deleteNote = function(note) {
        if (note.$remove) {
          return note.$remove();
        } else {
          throw new Error("error deleting note");
        }
      };

      PublicNoteService.getNoteById = function(id) {
        var ref = firebase.database().ref('notes/public/' + id);

        return $firebaseObject(ref);
      };

      PublicNoteService.updateNote = function(note) {
        if (note.$save) {
          return note.$save();
        } else {
          throw new Exception("error saving note");
        }
      };
    }
  ]);
