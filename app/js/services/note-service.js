angular
  .module('NoteFire')
  .service('NoteService', [
    '$firebaseArray', '$firebaseObject',
    function($firebaseArray, $firebaseObject) {
      'use strict';

      var NoteService = this;

      var notesRef = firebase.database().ref('notes/');
      var notes = $firebaseArray(notesRef);

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
        return notes.$getRecord(id);
      };

      NoteService.updateNote = function(note) {
        notes.$save(note);
      };
    }
  ]);
