angular.module('NoteFire').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('js/directives/footer.html',
    "<footer class=\"text-muted\">\n" +
    "  <div class=\"container\">\n" +
    "    <p><small>NoteFire created by <a href=\"https://twitter.com/bobzurad\">Bob Zurad</a> and powered by <a href=\"https://github.com/firebase/angularfire\">AngularFire</a></small></p>\n" +
    "  </div>\n" +
    "</footer>\n"
  );


  $templateCache.put('js/directives/navbar.html',
    "<div class=\"navbar navbar-fixed-top navbar-dark\">\n" +
    "  <div class=\"container\">\n" +
    "    <ul class=\"nav navbar-nav\">\n" +
    "      <li class=\"nav-item\">\n" +
    "        <a href=\"#/home\" class=\"navbar-brand\" title=\"Home\">\n" +
    "          NoteFire\n" +
    "          <i class=\"fa fa-fire fa-lg\" aria-hidden=\"true\"></i>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li class=\"nav-item pull-xs-right\">\n" +
    "        <a href=\"#/login\" class=\"nav-link navbar-link isNotAuthenticated\" title=\"Login\">\n" +
    "          <i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i>\n" +
    "          <small>Sign In</small>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li class=\"nav-item pull-xs-right\">\n" +
    "        <a href=\"#/logout\" class=\"nav-link navbar-link isAuthenticated\" title=\"Logout\"\n" +
    "          style=\"display: none;\">\n" +
    "          <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>\n" +
    "          <small>Sign Out</small>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li class=\"nav-item pull-xs-right\">\n" +
    "        <a id=\"newNoteLink\" href=\"#/new\" class=\"nav-link navbar-link\" title=\"New Note\"\n" +
    "          style=\"display: none;\">\n" +
    "          <i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i>\n" +
    "          New Note\n" +
    "        </a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('js/directives/public-warning.html',
    "<div ng-show=\"publicWarningCtrl.isVisible\" class=\"alert alert-warning\" role=\"alert\">\n" +
    "  These notes are open to the public. To create your own private notes, please\n" +
    "  <a href=\"#/login\">sign in</a> or <a href=\"#/login?register\">register</a>.\n" +
    "</div>\n"
  );


  $templateCache.put('js/directives/spinner.html',
    "<div id=\"spinner\" class=\"row\">\n" +
    "  <div class=\"col-xs-12 col-xs-offset-5\">\n" +
    "    <i class=\"fa fa-spinner fa-pulse fa-5x\"></i>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('js/templates/add-note.html',
    "<public-warning></public-warning>\n" +
    "\n" +
    "<form name=\"addNoteForm\" ng-submit=\"addNoteForm.$valid && addNoteCtrl.addNote()\" novalidate>\n" +
    "\n" +
    "  <fieldset class=\"form-group\">\n" +
    "    <div class=\"col-xs-9 padding-left-0\">\n" +
    "      <span class=\"form-control-label\"></span>\n" +
    "      <input type=\"text\" ng-model=\"addNoteCtrl.note.title\" class=\"form-control\"\n" +
    "              placeholder=\"Title\" maxlength=\"200\" required>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-3 padding-right-0\">\n" +
    "      <button id=\"newNoteTitleButton\" class=\"btn btn-primary pull-xs-right saveButton\" type=\"submit\">\n" +
    "        <span class=\"saveButtonText\">Save Note</span>\n" +
    "        <span class=\"saveButtonIcon\" style=\"display: none;\">\n" +
    "          <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "          <span class=\"sr-only\">Saving...</span>\n" +
    "        </span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "\n" +
    "  <fieldset class=\"form-group\">\n" +
    "    <span class=\"form-control-label\"></span>\n" +
    "    <textarea ui-tinymce=\"addNoteCtrl.tinymceOptions\" ng-model=\"addNoteCtrl.note.content\"\n" +
    "      rows=\"20\" ng-required>\n" +
    "    </textarea>\n" +
    "  </fieldset>\n" +
    "\n" +
    "  <fieldset class=\"form-group\">\n" +
    "    <button id=\"saveButton\" class=\"btn btn-primary pull-xs-right saveButton\" type=\"submit\">\n" +
    "      <span class=\"saveButtonText\">Save Note</span>\n" +
    "      <span class=\"saveButtonIcon\" style=\"display: none;\">\n" +
    "        <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "        <span class=\"sr-only\">Saving...</span>\n" +
    "      </span>\n" +
    "    </button>\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>\n"
  );


  $templateCache.put('js/templates/edit-note.html',
    "<public-warning></public-warning>\n" +
    "\n" +
    "<form name=\"editNoteForm\" ng-submit=\"editNoteForm.$valid && editNoteCtrl.saveNote()\" novalidate>\n" +
    "\n" +
    "  <fieldset class=\"form-group\">\n" +
    "    <div class=\"col-xs-9 padding-left-0\">\n" +
    "      <span class=\"form-control-label\"></span>\n" +
    "      <input type=\"text\" ng-model=\"editNoteCtrl.noteTitle\" class=\"form-control\"\n" +
    "              placeholder=\"Title\" maxlength=\"200\" required>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-3 padding-right-0\">\n" +
    "      <button id=\"editNoteTitleButton\" type=\"submit\" class=\"btn btn-primary pull-xs-right saveButton\">\n" +
    "        <span class=\"saveButtonText\">Save Note</span>\n" +
    "        <span class=\"saveButtonIcon\" style=\"display: none;\">\n" +
    "          <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "          <span class=\"sr-only\">Saving...</span>\n" +
    "        </span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "\n" +
    "  <fieldset class=\"form-group\">\n" +
    "    <span class=\"form-control-label\"></span>\n" +
    "    <textarea ui-tinymce=\"editNoteCtrl.tinymceOptions\" ng-model=\"editNoteCtrl.noteContent\"\n" +
    "      rows=\"20\" ng-required>\n" +
    "    </textarea>\n" +
    "  </fieldset>\n" +
    "\n" +
    "  <fieldset ng-show=\"!editNoteCtrl.showWarning\" class=\"form-group buttonGroup\">\n" +
    "    <div class=\"col-xs-6 padding-left-0\">\n" +
    "      <input type=\"button\" ng-click=\"editNoteCtrl.showDeleteWarning()\"\n" +
    "        class=\"btn btn-sm btn-danger\" role=\"button\" value=\"Delete Note\" />\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-6 padding-right-0\">\n" +
    "      <button type=\"submit\" class=\"btn btn-primary pull-xs-right saveButton\">\n" +
    "        <span class=\"saveButtonText\">Save Note</span>\n" +
    "        <span class=\"saveButtonIcon\" style=\"display: none;\">\n" +
    "          <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "          <span class=\"sr-only\">Saving...</span>\n" +
    "        </span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "\n" +
    "  <fieldset ng-show=\"editNoteCtrl.showWarning\" class=\"form-group deleteWarning\">\n" +
    "    <div class=\"col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4\">\n" +
    "    <p>Are you sure you want to delete this note?</p>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12 col-sm-4 col-md-6 col-lg-7 col-xl-8\">\n" +
    "      <input id=\"deleteButtonText\" type=\"button\" ng-click=\"editNoteCtrl.deleteNote()\"\n" +
    "        class=\"btn btn-danger\" role=\"button\" value=\"Yes\" />\n" +
    "      <button id=\"deleteButtonIcon\" type=\"button\" class=\"btn btn-danger disabled\" role=\"button\"\n" +
    "        style=\"display: none;\">\n" +
    "        <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "        <span class=\"sr-only\">Deleting...</span>\n" +
    "      </button>\n" +
    "      <input type=\"button\" ng-click=\"editNoteCtrl.hideDeleteWarning()\"\n" +
    "        class=\"btn btn-secondary\" role=\"button\" value=\"No\" />\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>\n"
  );


  $templateCache.put('js/templates/forgot-password.html',
    "<form name=\"resetPasswordForm\" ng-submit=\"resetPasswordForm.$valid && forgotPasswordCtrl.sendResetLink()\" novalidate>\n" +
    "\n" +
    "  <div>\n" +
    "    <p>Enter your email address to receive a link to reset your password.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <fieldset class=\"col-sm-7 col-lg-5 form-group\">\n" +
    "    <label for=\"email\" class=\"sr-only\">Email address</label>\n" +
    "    <input type=\"email\" class=\"form-control\" id=\"email\"\n" +
    "      ng-model=\"forgotPasswordCtrl.email\" placeholder=\"Email address\" required email>\n" +
    "  </fieldset>\n" +
    "\n" +
    "  <fieldset class=\"col-sm-5 col-lg-4 form-group\">\n" +
    "    <input id=\"resetButtonText\" class=\"btn btn-primary btn-block\" type=\"submit\" value=\"Reset Password\" />\n" +
    "    <button id=\"resetButtonIcon\" type=\"button\" class=\"btn btn-primary disabled\" role=\"button\"\n" +
    "      style=\"display: none;\">\n" +
    "      <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "      <span class=\"sr-only\">Loading...</span>\n" +
    "    </button>\n" +
    "  </fieldset>\n" +
    "\n" +
    "  <div class=\"message col-xs-12\">\n" +
    "    {{ forgotPasswordCtrl.message }}\n" +
    "  </div>\n" +
    "\n" +
    "</form>\n"
  );


  $templateCache.put('js/templates/home.html',
    "<spinner></spinner>\n" +
    "\n" +
    "<div ng-repeat=\"note in homeCtrl.notes | orderBy:'-dateUpdated'\">\n" +
    "  <div id=\"{{ note.id }}\" class=\"card col-md-4\" ng-click=\"homeCtrl.onCardClick(note.id)\">\n" +
    "    <div class=\"noteCard\">\n" +
    "      <h4>{{ note.title }}</h4>\n" +
    "      <p class=\"card-text\">\n" +
    "        {{ note.content.substr(0, 300) }}\n" +
    "        {{ (note.content.length > 300) ? '...' : '' }}\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('js/templates/login.html',
    "<div>\n" +
    "  <div class=\"col-md-7\">\n" +
    "    <h1 class=\"display-2\">NoteFire</h1>\n" +
    "    <p class=\"lead\">\n" +
    "      Your notes, encrypted, in the cloud. Create a free account to get started, or try our <a href=\"#/public\">public notes</a>.\n" +
    "    </p>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-5\">\n" +
    "    <ul id=\"loginTabs\" class=\"nav nav-tabs\" data-tabs=\"tabs\">\n" +
    "      <li class=\"nav-item\">\n" +
    "        <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#signinDiv\" role=\"tab\">Sign In</a>\n" +
    "      </li>\n" +
    "      <li class=\"nav-item\">\n" +
    "        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#registerDiv\" role=\"tab\">Register</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <div class=\"tab-content\">\n" +
    "      <div class=\"tab-pane active\" id=\"signinDiv\">\n" +
    "        <form class=\"form-signin\" name=\"signinForm\"\n" +
    "          ng-submit=\"signinForm.$valid && loginCtrl.signin()\" novalidate>\n" +
    "\n" +
    "          <label for=\"signinEmail\" class=\"sr-only\">Email address</label>\n" +
    "          <input type=\"email\" id=\"signinEmail\" class=\"form-control\"\n" +
    "            ng-model=\"loginCtrl.email\" placeholder=\"Email address\" required email>\n" +
    "\n" +
    "          <label for=\"signinPassword\" class=\"sr-only\">Password</label>\n" +
    "          <input type=\"password\" id=\"signinPassword\" class=\"form-control\"\n" +
    "            ng-model=\"loginCtrl.password\" placeholder=\"Password\" required>\n" +
    "\n" +
    "          <div ng-if=\"loginCtrl.signinError\" class=\"error\">\n" +
    "            {{ loginCtrl.signinError }}\n" +
    "          </div>\n" +
    "\n" +
    "          <p class=\"forgotPasswordText\">\n" +
    "            <small><a href=\"#/forgotPassword\">I forgot my password</a></small>\n" +
    "          </p>\n" +
    "          <button id=\"signinButton\" class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">\n" +
    "            <span id=\"signinButtonText\">Sign In</span>\n" +
    "            <span id=\"signinButtonIcon\" style=\"display: none;\">\n" +
    "              <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "              <span class=\"sr-only\">Loading...</span>\n" +
    "            </span>\n" +
    "          </button>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <div class=\"tab-pane\" id=\"registerDiv\">\n" +
    "        <form class=\"form-register\" name=\"registerForm\"\n" +
    "          ng-submit=\"registerForm.$valid && loginCtrl.register()\" novalidate>\n" +
    "\n" +
    "          <label for=\"registerEmail\" class=\"sr-only\">Email address</label>\n" +
    "          <input type=\"email\" id=\"registerEmail\" class=\"form-control\"\n" +
    "            ng-model=\"loginCtrl.email\" placeholder=\"Email address\" required email>\n" +
    "\n" +
    "          <label for=\"registerPassword\" class=\"sr-only\">Password</label>\n" +
    "          <input type=\"password\" id=\"registerPassword\" class=\"form-control\"\n" +
    "            ng-model=\"loginCtrl.password\" placeholder=\"Password\" required>\n" +
    "\n" +
    "          <label for=\"registerConfirmPassword\" class=\"sr-only\">Confirm Password</label>\n" +
    "          <input type=\"password\" id=\"registerConfirmPassword\" class=\"form-control\"\n" +
    "            ng-model=\"loginCtrl.confirmPassword\" placeholder=\"Confirm Password\" required>\n" +
    "\n" +
    "          <div ng-if=\"loginCtrl.registerError\" class=\"error\">\n" +
    "            {{ loginCtrl.registerError }}\n" +
    "          </div>\n" +
    "\n" +
    "          <button id=\"registerButton\" class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">\n" +
    "            <span id=\"registerButtonText\">Register</span>\n" +
    "            <span id=\"registerButtonIcon\" style=\"display: none;\">\n" +
    "              <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\n" +
    "              <span class=\"sr-only\">Loading...</span>\n" +
    "            </span>\n" +
    "          </button>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('js/templates/logout.html',
    ""
  );


  $templateCache.put('js/templates/public.html',
    "<public-warning></public-warning>\n" +
    "\n" +
    "<spinner></spinner>\n" +
    "\n" +
    "<div ng-repeat=\"note in publicCtrl.notes | orderBy:'-dateUpdated'\">\n" +
    "  <div id=\"{{ note.id }}\" class=\"card col-md-4\" ng-click=\"publicCtrl.onCardClick(note.id)\">\n" +
    "    <div class=\"noteCard\">\n" +
    "      <h4>{{ note.title }}</h4>\n" +
    "      <p class=\"card-text\">\n" +
    "        {{ note.content }}\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('js/templates/view-note.html',
    "<public-warning></public-warning>\n" +
    "\n" +
    "<div class=\"col-sm-10 col-xs-9\">\n" +
    "  <h3>{{ viewNoteCtrl.note.title }}</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-sm-2 col-xs-3\">\n" +
    "  <a ng-href=\"#/edit/{{ viewNoteCtrl.note.$id }}\" title=\"Edit Note\">\n" +
    "    <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n" +
    "    Edit\n" +
    "  </a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-xs-12 padding-left-0 padding-right-0\">\n" +
    "  <textarea ui-tinymce=\"viewNoteCtrl.tinymceOptions\" ng-model=\"viewNoteCtrl.note.content\"\n" +
    "    rows=\"20\" ng-required>\n" +
    "  </textarea>\n" +
    "</div>\n"
  );

}]);
