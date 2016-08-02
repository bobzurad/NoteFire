angular
  .module('NoteFire')
  .service('NoteService', [
    '$firebaseArray', '$firebaseObject', 'Auth',
    function($firebaseArray, $firebaseObject, Auth) {
      'use strict';

      //init
      var NoteService = this,
        user = Auth.$getAuth(),
        notesRef = firebase.database().ref('notes/' + user.uid),
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
