(function() {
  'use strict';

  angular
    .module('NoteFire', ['ngRoute', 'ngSanitize', 'firebase', 'ui.tinymce'])
    .constant('Constants',  {
      FirebaseConfig: {
        apiKey: 'AIzaSyBgxr7HG-wEHoq1M_pcW7OIZMys8XGbRt4',
        authDomain: 'notefireapp.firebaseapp.com',
        databaseURL: 'https://notefireapp.firebaseio.com/',
        storageBucket: 'notefireapp.appspot.com',
      },
      TinyMceOptions: {
        removed_menuitems: 'newdocument',
        statusbar: false,
        plugins: ["autolink", "preview", "paste", "advlist", "codesample", "image",
          "imagetools", "link", "media", "nonbreaking", "pagebreak", "print", "searchreplace",
          "table", "textcolor", "textpattern"
        ],
        toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table',
        toolbar2: 'print preview | link image media | forecolor backcolor nonbreaking pagebreak | searchreplace codesample',
        image_advtab: true
      }
    })
    .config(["$routeProvider", function($routeProvider) {
    	$routeProvider
        .when('/home', {
          templateUrl: 'js/templates/home.html',
          controller: 'HomeController',
          controllerAs: 'homeCtrl',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            currentAuth: ["Auth", function(Auth) {
              // $waitForSignIn returns a promise so the resolve waits for it to complete
              return Auth.$waitForSignIn();
            }]
          }
        })
        .when('/logout', {
          templateUrl: 'js/templates/logout.html',
          controller: 'LogoutController',
          controllerAs: 'logoutCtrl',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            currentAuth: ["Auth", function(Auth) {
              // $waitForSignIn returns a promise so the resolve waits for it to complete
              return Auth.$requireSignIn();
            }]
          }
        })
      	.when('/new', {
        	templateUrl: 'js/templates/add-note.html',
          controller: 'AddNoteController',
          controllerAs: 'addNoteCtrl',
          resolve: {
            // controller will not be loaded until $requireSignIn resolves
            currentAuth: ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $routeChangeError
              return Auth.$waitForSignIn();
            }]
          }
      	})
        .when('/view/:id', {
          templateUrl: 'js/templates/view-note.html',
          controller: 'ViewNoteController',
          controllerAs: 'viewNoteCtrl',
          resolve: {
            currentAuth: ["Auth", function(Auth) {
              return Auth.$waitForSignIn();
            }]
          }
        })
        .when('/edit/:id', {
          templateUrl: 'js/templates/edit-note.html',
          controller: 'EditNoteController',
          controllerAs: 'editNoteCtrl',
          resolve: {
            currentAuth: ["Auth", function(Auth) {
              return Auth.$waitForSignIn();
            }]
          }
        })
        .when('/public', {
          templateUrl: 'js/templates/public.html',
          controller: 'PublicController',
          controllerAs: 'publicCtrl'
        })
        .when('/forgotPassword', {
          templateUrl: 'js/templates/forgot-password.html',
          controller: 'ForgotPasswordController',
          controllerAs: 'forgotPasswordCtrl'
        })
        .otherwise({
          templateUrl: 'js/templates/login.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl',
          resolve: {
            currentAuth: ["Auth", function(Auth) {
              return Auth.$waitForSignIn();
            }]
          }
        });
    }])
    .run(["$rootScope", "$location", 'Constants',
        function($rootScope, $location, Constants) {
          firebase.initializeApp(Constants.FirebaseConfig);

          $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
              $location.path("/login");
            }
          });
        }
      ]);
})();

angular
  .module('NoteFire')
  .controller('AddNoteController', [
    '$location', 'NoteService', 'PublicNoteService', 'currentAuth', 'Constants',
    function($location, NoteService, PublicNoteService, currentAuth, Constants) {
      'use strict';

      var controller = this;

      controller.note = {};
      controller.tinymceOptions = Constants.TinyMceOptions;

      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      controller.addNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element("#saveButton").addClass("disabled");
        angular.element("#saveButtonText").hide();
        angular.element("#saveButtonIcon").show();

        var note = {
          title: controller.note.title,
          content: controller.note.content,
          dateCreated: Date.now()
        };

        if (currentAuth) {
          NoteService
            .addNote(note)
            .then(addNoteCallback);
        } else {
          PublicNoteService
            .addNote(note)
            .then(addNoteCallback);
        }
      };

      function addNoteCallback(noteRef) {
        angular.element("#saveButton").removeClass("disabled");
        angular.element("#saveButtonIcon").hide();
        angular.element("#saveButtonText").show();

        controller.note = {};

        $location.url('view/' + noteRef.key);
      }
    }
  ]);

angular
  .module('NoteFire')
  .controller('EditNoteController', [
    '$routeParams', '$location', 'NoteService', 'PublicNoteService', 'currentAuth','Constants',
    function($routeParams, $location, NoteService, PublicNoteService, currentAuth, Constants) {
      'use strict';

      var controller = this;

      controller.showWarning = false;
      controller.tinymceOptions = Constants.TinyMceOptions;

      if (currentAuth) {
        NoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
            if (note.isEncrypted) {
              controller.note.title = sjcl.decrypt(currentAuth.uid, note.title);
              controller.note.content = sjcl.decrypt(currentAuth.uid, note.content);
              controller.note.isEncrypted = false;
            }
            //these values used by the view to prevent user from seeing encryption while saving note
            controller.noteTitle = controller.note.title;
            controller.noteContent = controller.note.content;
          });
      } else {
        PublicNoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
            controller.noteTitle = controller.note.title;
            controller.noteContent = controller.note.content;
          });
      }

      angular.element("#newNoteLink").show();
      window.scrollTo(0,0);

      controller.saveNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        angular.element("#saveButton").addClass("disabled");
        angular.element("#saveButtonText").hide();
        angular.element("#saveButtonIcon").show();

        controller.note.title = controller.noteTitle;
        controller.note.content = controller.noteContent;

        if (currentAuth) {
          NoteService
            .updateNote(controller.note)
            .then(updateNoteCallback);
        } else {
          PublicNoteService
            .updateNote(controller.note)
            .then(updateNoteCallback);
        }
      };

      controller.showDeleteWarning = function() {
        controller.showWarning = true;
      };

      controller.hideDeleteWarning = function() {
        controller.showWarning = false;
      };

      controller.deleteNote = function() {
        angular.element("#deleteButtonText").hide();
        angular.element("#deleteButtonIcon").show();

        if (currentAuth) {
          NoteService
            .deleteNote(controller.note)
            .then(deleteNoteCallback);
        } else {
          PublicNoteService
            .deleteNote(controller.note)
            .then(deleteNoteCallback);
        }
      };

      function updateNoteCallback(noteRef) {
        angular.element("#saveButton").removeClass("disabled");
        angular.element("#saveButtonIcon").hide();
        angular.element("#saveButtonText").show();

        controller.note = {};
        $location.path('/view/' + noteRef.key);
      }

      function deleteNoteCallback() {
        angular.element("#deleteButtonIcon").hide();
        angular.element("#deleteButtonText").show();

        controller.note = {};
        $location.url('home');
      }
    }
  ]);

angular
  .module('NoteFire')
  .controller('ForgotPasswordController', [
    '$location', 'Auth',
    function($location, Auth) {
      'use strict';

      var controller = this;

      controller.sendResetLink = function() {
        controller.message = '';
        showSpinner();

        Auth.$sendPasswordResetEmail(controller.email)
          .then(function() {
            hideSpinner();
            angular.element(".message").removeClass("error");
            controller.message = "Message sent. Check your inbox for a link to reset your password.";
          })
          .catch(function(error) {
            hideSpinner();
            angular.element(".message").addClass("error");
            if (error.code === "auth/user-not-found") {
              controller.message = "This email address was not found.";
            } else {
              controller.message = error.message;
            }
          });
      };

      function showSpinner() {
        angular.element("#resetButtonText").hide();
        angular.element("#resetButtonIcon").show();
      }

      function hideSpinner() {
        angular.element("#resetButtonIcon").hide();
        angular.element("#resetButtonText").show();
      }
    }
  ]);

angular
  .module('NoteFire')
  .controller('HomeController', [
    '$location', 'NoteService', 'currentAuth',
    function($location, NoteService, currentAuth) {
      'use strict';

      if (!currentAuth) {
        $location.url("public");
        return;
      }

      var controller = this;

      angular.element("#newNoteLink").show();

      NoteService.init();
      NoteService.getNotes()
        .$loaded()
        .then(function(notes) {
          controller.notes = notes.map(function(note) {
            if (note.isEncrypted) {
              return {
                id: note.$id,
                dateCreated: note.dateCreated,
                title: sjcl.decrypt(currentAuth.uid, note.title),
                content: sjcl.decrypt(currentAuth.uid, note.content)
                  .replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "http://...") //this regex from taken from http://stackoverflow.com/a/26764609
                  .replace(/<\/?[^>]+>/gi, '')
                  .replace(/&nbsp;/g," ")
                  .replace(/&rsquo;/g, "'")
                  .replace(/&middot;/g, "")
                  .substr(0, 300)
              };
            } else {
              return {
                id: note.$id,
                dateCreated: note.dateCreated,
                title: note.title,
                content: note.content
                  .replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "http://...") //this regex from taken from http://stackoverflow.com/a/26764609
                  .replace(/<\/?[^>]+>/gi, '')
                  .replace(/&nbsp;/g," ")
                  .replace(/&rsquo;/g, "'")
                  .replace(/&middot;/g, "")
                  .substr(0, 300)
              };
            }
          });
        });

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);

angular
  .module('NoteFire')
  .controller('LoginController', [
    '$location', 'Auth', 'NoteService',
    function($location, Auth, NoteService) {
      'use strict';

      var controller = this;

      //if user is already authenticated, redirect them home
      if (Auth.$getAuth()) {
        $location.url('home');
      }

      if ($location.search().register) {
        $("#loginTabs a:last").tab('show');
      }

      angular.element("#newNoteLink").hide();

      //hack to make bootstrap tabs work with Angular
      angular.element('#loginTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
      });

      controller.signin = function() {
        controller.signinError = null;
        showSpinnerOnSigninButton();

        Auth.$signInWithEmailAndPassword(controller.email, controller.password)
          .then(function(user) {
            hideSpinnerOnSigninButton();
            $location.url("home");
          })
          .catch(function(error) {
            hideSpinnerOnSigninButton();
            if (error.code === "auth/user-not-found") {
              controller.signinError = "Email Address Not Found";
            } else if (error.code === "auth/wrong-password"){
              controller.signinError = "Invalid Password";
            } else {
              controller.signinError = error.message;
            }
          });
      };

      controller.register = function() {
        controller.registerError = null;

        if (controller.password !== controller.confirmPassword) {
          controller.registerError = "Passwords do not match";
          return;
        }

        showSpinnerOnRegisterButton();

        Auth.$createUserWithEmailAndPassword(controller.email, controller.password)
          .then(function(user) {
            //after creating the user, create their first note
            var ref = firebase.database().ref('notes/' + user.uid);
            NoteService.init(ref);
            NoteService.addNote({
              title: 'Your First Note!',
              content: 'Welcome to FireNote!',
              dateCreated: Date.now()
            })
            .then(function() {
              //everything is awesome. cleanup and redirect to home
              hideSpinnerOnRegisterButton();
              $location.path("home");
            })
            .catch(function(error) {
              //error creating note
              hideSpinnerOnRegisterButton();
              controller.registerError = error.message;
            });
          })
          .catch(function(error) {
            //error creating user
            hideSpinnerOnRegisterButton();
            controller.registerError = error.message;
          });
      };

      function showSpinnerOnSigninButton() {
        angular.element("#signinButton").addClass("disabled");
        angular.element("#signinButtonText").hide();
        angular.element("#signinButtonIcon").show();
      }

      function hideSpinnerOnSigninButton() {
        angular.element("#signinButton").removeClass("disabled");
        angular.element("#signinButtonIcon").hide();
        angular.element("#signinButtonText").show();
      }

      function showSpinnerOnRegisterButton() {
        angular.element("#registerButton").addClass("disabled");
        angular.element("#registerButtonText").hide();
        angular.element("#registerButtonIcon").show();
      }

      function hideSpinnerOnRegisterButton() {
        angular.element("#registerButton").removeClass("disabled");
        angular.element("#registerButtonIcon").hide();
        angular.element("#registerButtonText").show();
      }
    }
  ]);

angular
  .module('NoteFire')
  .controller('LogoutController', [
    '$location', 'Auth', 'currentAuth', 'NoteService',
    function($location, Auth, currentAuth, NoteService) {
      'use strict';

      var controller = this;

      Auth.$onAuthStateChanged(function(user) {
        if (!user) {
          $location.url("login");          
        }
      });

      controller.logout = function() {
        NoteService.close();
        Auth.$signOut();
      };

      controller.logout();
    }
  ]);

angular
  .module('NoteFire')
  .controller('PublicController', [
    '$location', 'PublicNoteService',
    function($location, PublicNoteService) {
      'use strict';

      var controller = this;

      angular.element("#newNoteLink").show();

      PublicNoteService.init();
      PublicNoteService.getNotes()
        .$loaded()
        .then(function(notes) {
          controller.notes = notes.map(function(note) {
            return {
              id: note.$id,
              dateCreated: note.dateCreated,
              title: note.title,
              content: note.content
                .replace(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "http://...") //this regex from taken from http://stackoverflow.com/a/26764609
                .replace(/<\/?[^>]+>/gi, '')
                .replace(/&nbsp;/g," ")
                .replace(/&rsquo;/g, "'")
                .replace(/&middot;/g, "")
                .substr(0, 300)
            };
          });
        });

      controller.onCardClick = function(id) {
        $location.url('view/' + id);
      };
    }
  ]);

angular
  .module('NoteFire')
  .controller('ViewNoteController', [
    '$routeParams', 'NoteService', 'PublicNoteService', 'currentAuth',
    function($routeParams, NoteService, PublicNoteService, currentAuth) {
      'use strict';

      var controller = this;

      controller.tinymceOptions = {
        readonly: true,
        toolbar: false,
        menubar: false,
        statusbar: false,
        plugins: ["codesample"],
        setup: function(editor){
          //preserve hyperlink navigation (http://stackoverflow.com/a/34322305)
          if (editor.settings.readonly) {
            editor.on('init', function() {
              $(editor.getBody()).on('click', 'a[href]', function(e) {
                window.open($(e.currentTarget).attr('href'),'_blank');
              });
            });
          }
        }
      };

      if (currentAuth) {
        NoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
            if (note.isEncrypted) {
              controller.note.title = sjcl.decrypt(currentAuth.uid, note.title);
              controller.note.content = sjcl.decrypt(currentAuth.uid, note.content);
              controller.note.isEncrypted = false;
            }
          });
      } else {
        PublicNoteService.getNoteById($routeParams.id)
          .$loaded(function(note) {
            controller.note = note;
          });
      }

      angular.element("#newNoteLink").show();
      window.scrollTo(0, 0);
    }
  ]);

angular
  .module('NoteFire')
  .directive('navBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/navbar.html',
      controllerAs: 'navBarCtrl',
      controller: [
        'Auth',
        function(Auth) {
          'use strict';

          var controller = this;

          Auth.$onAuthStateChanged(function(user) {
            //show or hide links in navbar
            if (user) {
              angular.element(".isNotAuthenticated").hide();
              angular.element(".isAuthenticated").show();
            } else {
              angular.element(".isAuthenticated").hide();
              angular.element(".isNotAuthenticated").show();
            }
          });
        }
      ]
    };
  });

angular
  .module('NoteFire')
  .directive('publicWarning', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/public-warning.html',
      controllerAs: 'publicWarningCtrl',
      controller: [
        'Auth',
        function(Auth) {
          'use strict';

          var controller = this;

          controller.isVisible = false;

          Auth.$onAuthStateChanged(function(user) {
            controller.isVisible = !user;
          });
        }
      ]
    };
  });

angular
  .module('NoteFire')
  .factory("Auth", [
    "$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);

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
