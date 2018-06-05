angular.module('NoteFire').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('js/directives/footer.html',
    "<footer class=\"footer text-muted\">\r" +
    "\n" +
    "  <div class=\"container\">\r" +
    "\n" +
    "    <small>NoteFire created by <a href=\"https://twitter.com/bobzurad\">Bob Zurad</a> and powered by <a href=\"https://github.com/firebase/angularfire\">AngularFire</a></small>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</footer>\r" +
    "\n"
  );


  $templateCache.put('js/directives/navbar.html',
    "<nav class=\"navbar navbar-expand-md navbar-dark fixed-top\">\r" +
    "\n" +
    "  <div class=\"container\">\r" +
    "\n" +
    "    <a href=\"#/home\" class=\"navbar-brand\" title=\"Home\">\r" +
    "\n" +
    "      NoteFire\r" +
    "\n" +
    "      <i class=\"fa fa-fire fa-lg\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <button class=\"navbar-toggler collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarCollapse\" aria-controls=\"navbarCollapse\"\r" +
    "\n" +
    "      aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r" +
    "\n" +
    "      <span class=\"navbar-toggler-icon\"></span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "    <div class=\"navbar-collapse collapse\" id=\"navbarCollapse\">\r" +
    "\n" +
    "      <ul class=\"nav navbar-nav ml-auto\">\r" +
    "\n" +
    "        <li class=\"nav-item\">\r" +
    "\n" +
    "          <a id=\"newNoteLink\" href=\"#/new\" class=\"nav-link navbar-link\" title=\"New Note\" style=\"display: none;\">\r" +
    "\n" +
    "            <i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "            New Note\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li class=\"nav-item\">\r" +
    "\n" +
    "          <a href=\"#/login\" class=\"nav-link navbar-link isNotAuthenticated\" title=\"Login\">\r" +
    "\n" +
    "            <i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "            <small>Sign In</small>\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "        <li class=\"nav-item\">\r" +
    "\n" +
    "          <a href=\"#/logout\" class=\"nav-link navbar-link isAuthenticated\" title=\"Logout\" style=\"display: none;\">\r" +
    "\n" +
    "            <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "            <small>Sign Out</small>\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "      </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</nav>"
  );


  $templateCache.put('js/directives/public-warning.html',
    "<div ng-show=\"publicWarningCtrl.isVisible\" class=\"alert alert-warning\" role=\"alert\">\r" +
    "\n" +
    "  These notes are open to the public. To create your own private notes, please\r" +
    "\n" +
    "  <a href=\"#/login\">sign in</a> or <a href=\"#/login?register\">register</a>.\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('js/directives/spinner.html',
    "<div id=\"spinner\" class=\"row\">\r" +
    "\n" +
    "  <div class=\"col-12 d-flex justify-content-center\">\r" +
    "\n" +
    "    <i class=\"fa fa-spinner fa-pulse fa-5x\"></i>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('js/templates/add-note.html',
    "<public-warning></public-warning>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<form name=\"addNoteForm\" ng-submit=\"addNoteForm.$valid && addNoteCtrl.addNote()\" novalidate>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset class=\"form-group\">\r" +
    "\n" +
    "    <div class=\"form-row\">\r" +
    "\n" +
    "      <div class=\"col-9 padding-left-0\">\r" +
    "\n" +
    "        <span class=\"form-control-label\"></span>\r" +
    "\n" +
    "        <input type=\"text\" ng-model=\"addNoteCtrl.note.title\" class=\"form-control\"\r" +
    "\n" +
    "                placeholder=\"Title\" maxlength=\"200\" required>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-3 d-flex justify-content-end padding-right-0\">\r" +
    "\n" +
    "        <button id=\"newNoteTitleButton\" class=\"btn btn-primary saveButton\" type=\"submit\">\r" +
    "\n" +
    "          <span class=\"saveButtonText\">Save Note</span>\r" +
    "\n" +
    "          <span class=\"saveButtonIcon\" style=\"display: none;\">\r" +
    "\n" +
    "            <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "            <span class=\"sr-only\">Saving...</span>\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset class=\"form-group\">\r" +
    "\n" +
    "    <span class=\"form-control-label\"></span>\r" +
    "\n" +
    "    <textarea ui-tinymce=\"addNoteCtrl.tinymceOptions\" ng-model=\"addNoteCtrl.note.content\"\r" +
    "\n" +
    "      rows=\"20\" ng-required>\r" +
    "\n" +
    "    </textarea>\r" +
    "\n" +
    "  </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset class=\"form-group\">\r" +
    "\n" +
    "    <div class=\"form-row\">\r" +
    "\n" +
    "      <div class=\"col d-flex justify-content-end\">\r" +
    "\n" +
    "        <button id=\"saveButton\" class=\"btn btn-primary saveButton\" type=\"submit\">\r" +
    "\n" +
    "          <span class=\"saveButtonText\">Save Note</span>\r" +
    "\n" +
    "          <span class=\"saveButtonIcon\" style=\"display: none;\">\r" +
    "\n" +
    "            <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "            <span class=\"sr-only\">Saving...</span>\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div> \r" +
    "\n" +
    "  </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</form>\r" +
    "\n"
  );


  $templateCache.put('js/templates/edit-note.html',
    "<public-warning></public-warning>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<form name=\"editNoteForm\" ng-submit=\"editNoteForm.$valid && editNoteCtrl.saveNote()\" novalidate>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset class=\"form-group\">\r" +
    "\n" +
    "    <div class=\"form-row\">\r" +
    "\n" +
    "      <div class=\"col-9 padding-left-0\">\r" +
    "\n" +
    "        <span class=\"form-control-label\"></span>\r" +
    "\n" +
    "        <input type=\"text\" ng-model=\"editNoteCtrl.noteTitle\" class=\"form-control\"\r" +
    "\n" +
    "                placeholder=\"Title\" maxlength=\"200\" required>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-3 d-flex justify-content-end padding-right-0\">\r" +
    "\n" +
    "        <button id=\"editNoteTitleButton\" type=\"submit\" class=\"btn btn-primary saveButton\">\r" +
    "\n" +
    "          <span class=\"saveButtonText\">Save Note</span>\r" +
    "\n" +
    "          <span class=\"saveButtonIcon\" style=\"display: none;\">\r" +
    "\n" +
    "            <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "            <span class=\"sr-only\">Saving...</span>\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </fieldset>\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  <fieldset class=\"form-group\">\r" +
    "\n" +
    "    <span class=\"form-control-label\"></span>\r" +
    "\n" +
    "    <textarea ui-tinymce=\"editNoteCtrl.tinymceOptions\" ng-model=\"editNoteCtrl.noteContent\"\r" +
    "\n" +
    "      rows=\"20\" ng-required>\r" +
    "\n" +
    "    </textarea>\r" +
    "\n" +
    "  </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset ng-show=\"!editNoteCtrl.showWarning\" class=\"form-group buttonGroup\">\r" +
    "\n" +
    "    <div class=\"form-row\">\r" +
    "\n" +
    "      <div class=\"col-6 padding-left-0\">\r" +
    "\n" +
    "        <input type=\"button\" ng-click=\"editNoteCtrl.showDeleteWarning()\"\r" +
    "\n" +
    "          class=\"btn btn-sm btn-danger\" role=\"button\" value=\"Delete Note\" />\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-6 d-flex justify-content-end padding-right-0\">\r" +
    "\n" +
    "        <button type=\"submit\" class=\"btn btn-primary saveButton\">\r" +
    "\n" +
    "          <span class=\"saveButtonText\">Save Note</span>\r" +
    "\n" +
    "          <span class=\"saveButtonIcon\" style=\"display: none;\">\r" +
    "\n" +
    "            <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "            <span class=\"sr-only\">Saving...</span>\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset ng-show=\"editNoteCtrl.showWarning\" class=\"form-group deleteWarning\">\r" +
    "\n" +
    "    <div class=\"col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4\">\r" +
    "\n" +
    "    <p>Are you sure you want to delete this note?</p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-xs-12 col-sm-4 col-md-6 col-lg-7 col-xl-8\">\r" +
    "\n" +
    "      <input id=\"deleteButtonText\" type=\"button\" ng-click=\"editNoteCtrl.deleteNote()\"\r" +
    "\n" +
    "        class=\"btn btn-danger\" role=\"button\" value=\"Yes\" />\r" +
    "\n" +
    "      <button id=\"deleteButtonIcon\" type=\"button\" class=\"btn btn-danger disabled\" role=\"button\"\r" +
    "\n" +
    "        style=\"display: none;\">\r" +
    "\n" +
    "        <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "        <span class=\"sr-only\">Deleting...</span>\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "      <input type=\"button\" ng-click=\"editNoteCtrl.hideDeleteWarning()\"\r" +
    "\n" +
    "        class=\"btn btn-secondary\" role=\"button\" value=\"No\" />\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</form>\r" +
    "\n"
  );


  $templateCache.put('js/templates/forgot-password.html',
    "<form name=\"resetPasswordForm\" ng-submit=\"resetPasswordForm.$valid && forgotPasswordCtrl.sendResetLink()\" novalidate>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div>\r" +
    "\n" +
    "    <p>Enter your email address to receive a link to reset your password.</p>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset class=\"col-sm-7 col-lg-5 form-group\">\r" +
    "\n" +
    "    <label for=\"email\" class=\"sr-only\">Email address</label>\r" +
    "\n" +
    "    <input type=\"email\" class=\"form-control\" id=\"email\"\r" +
    "\n" +
    "      ng-model=\"forgotPasswordCtrl.email\" placeholder=\"Email address\" required email>\r" +
    "\n" +
    "  </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <fieldset class=\"col-sm-5 col-lg-4 form-group\">\r" +
    "\n" +
    "    <input id=\"resetButtonText\" class=\"btn btn-primary btn-block\" type=\"submit\" value=\"Reset Password\" />\r" +
    "\n" +
    "    <button id=\"resetButtonIcon\" type=\"button\" class=\"btn btn-primary disabled\" role=\"button\"\r" +
    "\n" +
    "      style=\"display: none;\">\r" +
    "\n" +
    "      <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "      <span class=\"sr-only\">Loading...</span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "  </fieldset>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"message col-xs-12\">\r" +
    "\n" +
    "    {{ forgotPasswordCtrl.message }}\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</form>\r" +
    "\n"
  );


  $templateCache.put('js/templates/home.html',
    "<spinner></spinner>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-repeat=\"note in homeCtrl.notes | orderBy:'-dateUpdated'\">\r" +
    "\n" +
    "  <div id=\"{{ note.id }}\" class=\"card col-md-4\" ng-click=\"homeCtrl.onCardClick(note.id)\">\r" +
    "\n" +
    "    <div class=\"noteCard\">\r" +
    "\n" +
    "      <h4>{{ note.title }}</h4>\r" +
    "\n" +
    "      <p class=\"card-text\">\r" +
    "\n" +
    "        {{ note.content.substr(0, 300) }}\r" +
    "\n" +
    "        {{ (note.content.length > 300) ? '...' : '' }}\r" +
    "\n" +
    "      </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('js/templates/login.html',
    "<div class=\"row\">\r" +
    "\n" +
    "  <div class=\"col-md-7\">\r" +
    "\n" +
    "    <h1 class=\"display-2\">NoteFire</h1>\r" +
    "\n" +
    "    <p class=\"lead\">\r" +
    "\n" +
    "      Your notes, encrypted, in the cloud. Create a free account to get started, or try our <a href=\"#/public\">public notes</a>.\r" +
    "\n" +
    "    </p>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"col-md-5\">\r" +
    "\n" +
    "    <ul id=\"loginTabs\" class=\"nav nav-tabs\" data-tabs=\"tabs\">\r" +
    "\n" +
    "      <li class=\"nav-item\">\r" +
    "\n" +
    "        <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#signinDiv\" role=\"tab\">Sign In</a>\r" +
    "\n" +
    "      </li>\r" +
    "\n" +
    "      <li class=\"nav-item\">\r" +
    "\n" +
    "        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#registerDiv\" role=\"tab\">Register</a>\r" +
    "\n" +
    "      </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "    <div class=\"tab-content\">\r" +
    "\n" +
    "      <div class=\"tab-pane active\" id=\"signinDiv\">\r" +
    "\n" +
    "        <form class=\"form-signin\" name=\"signinForm\"\r" +
    "\n" +
    "          ng-submit=\"signinForm.$valid && loginCtrl.signin()\" novalidate>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <label for=\"signinEmail\" class=\"sr-only\">Email address</label>\r" +
    "\n" +
    "          <input type=\"email\" id=\"signinEmail\" class=\"form-control\"\r" +
    "\n" +
    "            ng-model=\"loginCtrl.email\" placeholder=\"Email address\" required email>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <label for=\"signinPassword\" class=\"sr-only\">Password</label>\r" +
    "\n" +
    "          <input type=\"password\" id=\"signinPassword\" class=\"form-control\"\r" +
    "\n" +
    "            ng-model=\"loginCtrl.password\" placeholder=\"Password\" required>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <div ng-if=\"loginCtrl.signinError\" class=\"error\">\r" +
    "\n" +
    "            {{ loginCtrl.signinError }}\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <p class=\"forgotPasswordText\">\r" +
    "\n" +
    "            <small><a href=\"#/forgotPassword\">I forgot my password</a></small>\r" +
    "\n" +
    "          </p>\r" +
    "\n" +
    "          <button id=\"signinButton\" class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">\r" +
    "\n" +
    "            <span id=\"signinButtonText\">Sign In</span>\r" +
    "\n" +
    "            <span id=\"signinButtonIcon\" style=\"display: none;\">\r" +
    "\n" +
    "              <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "              <span class=\"sr-only\">Loading...</span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "          </button>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"tab-pane\" id=\"registerDiv\">\r" +
    "\n" +
    "        <form class=\"form-register\" name=\"registerForm\"\r" +
    "\n" +
    "          ng-submit=\"registerForm.$valid && loginCtrl.register()\" novalidate>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <label for=\"registerEmail\" class=\"sr-only\">Email address</label>\r" +
    "\n" +
    "          <input type=\"email\" id=\"registerEmail\" class=\"form-control\"\r" +
    "\n" +
    "            ng-model=\"loginCtrl.email\" placeholder=\"Email address\" required email>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <label for=\"registerPassword\" class=\"sr-only\">Password</label>\r" +
    "\n" +
    "          <input type=\"password\" id=\"registerPassword\" class=\"form-control\"\r" +
    "\n" +
    "            ng-model=\"loginCtrl.password\" placeholder=\"Password\" required>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <label for=\"registerConfirmPassword\" class=\"sr-only\">Confirm Password</label>\r" +
    "\n" +
    "          <input type=\"password\" id=\"registerConfirmPassword\" class=\"form-control\"\r" +
    "\n" +
    "            ng-model=\"loginCtrl.confirmPassword\" placeholder=\"Confirm Password\" required>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <div ng-if=\"loginCtrl.registerError\" class=\"error\">\r" +
    "\n" +
    "            {{ loginCtrl.registerError }}\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <button id=\"registerButton\" class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">\r" +
    "\n" +
    "            <span id=\"registerButtonText\">Register</span>\r" +
    "\n" +
    "            <span id=\"registerButtonIcon\" style=\"display: none;\">\r" +
    "\n" +
    "              <i class=\"fa fa-spinner fa-pulse fa-lg\"></i>\r" +
    "\n" +
    "              <span class=\"sr-only\">Loading...</span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "          </button>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('js/templates/logout.html',
    ""
  );


  $templateCache.put('js/templates/public.html',
    "<public-warning></public-warning>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<spinner></spinner>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-repeat=\"note in publicCtrl.notes | orderBy:'-dateUpdated'\">\r" +
    "\n" +
    "  <div id=\"{{ note.id }}\" class=\"card col-md-4\" ng-click=\"publicCtrl.onCardClick(note.id)\">\r" +
    "\n" +
    "    <div class=\"noteCard\">\r" +
    "\n" +
    "      <h4>{{ note.title }}</h4>\r" +
    "\n" +
    "      <p class=\"card-text\">\r" +
    "\n" +
    "        {{ note.content }}\r" +
    "\n" +
    "      </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('js/templates/view-note.html',
    "<public-warning></public-warning>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "  <div class=\"col-9\">\r" +
    "\n" +
    "    <h3>{{ viewNoteCtrl.note.title }}</h3>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"col-3 d-flex justify-content-end\">\r" +
    "\n" +
    "    <a ng-href=\"#/edit/{{ viewNoteCtrl.note.$id }}\" title=\"Edit Note\">\r" +
    "\n" +
    "      <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "      Edit\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"col-xs-12 padding-left-0 padding-right-0\">\r" +
    "\n" +
    "  <textarea ui-tinymce=\"viewNoteCtrl.tinymceOptions\" ng-model=\"viewNoteCtrl.note.content\"\r" +
    "\n" +
    "    rows=\"20\" ng-required>\r" +
    "\n" +
    "  </textarea>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
