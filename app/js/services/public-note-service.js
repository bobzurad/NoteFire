angular
  .module('NoteFire')
  .service('PublicNoteService', [
    '$firebaseArray', '$firebaseObject',
    function($firebaseArray, $firebaseObject) {
      'use strict';

      //init
      var NoteService = this,
        notesRef = firebase.database().ref('notes/public'),
        notes = $firebaseArray(notesRef);

      //public functions
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
