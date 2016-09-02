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
        if (notes) {
          notes.$destroy();
        }
      };

      NoteService.getNotes = function() {
        return notes;
      };

      NoteService.addNote = function(note) {
        var user = Auth.$getAuth();

        note.title = sjcl.encrypt(user.uid, note.title);
        note.content = sjcl.encrypt(user.uid, note.content);
        note.isEncrypted = true;

        if (notes) {
          return notes.$add(note);
        } else {
          var ref = firebase.database().ref('notes/' + user.uid);
          var fbNotes = $firebaseArray(ref);

          return fbNotes.$add(note);
        }
      };

      NoteService.deleteNote = function(note) {
        if (note.$remove) {
          return note.$remove();
        } else {
          throw new Error("error deleting note");
        }
      };

      NoteService.getNoteById = function(id) {
        var user = Auth.$getAuth();
        var ref = firebase.database().ref('notes/' + user.uid + '/' + id);

        return $firebaseObject(ref);
      };

      NoteService.updateNote = function(note) {
        var user = Auth.$getAuth();

        note.title = sjcl.encrypt(user.uid, note.title);
        note.content = sjcl.encrypt(user.uid, note.content);
        note.isEncrypted = true;

        if (note.$save) {
          return note.$save();
        } else {
          throw new Error("error saving note");
        }
      };
    }
  ]);
