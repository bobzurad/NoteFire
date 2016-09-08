module.exports = function(grunt) {
  //project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //ngtemplates config
    ngtemplates: {
      NoteFire: {
        cwd: "app/",
        src: [
          "js/directives/*.html",
          "js/templates/*.html"
        ],
        dest: "_deploy/templates.js"
      }
    },
    //concat config
    concat: {
      libs: {
        //libs that we're not using a CDN
        src: [
          'app/libs/angular-ui-tinymce/tinymce.js', //don't use the .min file until issue #264 is fixed https://github.com/angular-ui/ui-tinymce/issues/264
        ],
        dest: '_deploy/libs.js'
      },
      app: {
        src: [
          'app/js/app.js',
          'app/js/controllers/*.js',
          'app/js/directives/*.js',
          'app/js/factories/*.js',
          'app/js/services/*.js',
          'app/js/templates/*.js'
        ],
        dest: '_deploy/app.js'
      },
      css: {
        src: [
          'app/css/main.css',
          'app/css/login.css',
          'app/css/view-note.css'
        ],
        dest: '_deploy/app.css'
      }
    },
    //uglify config
    uglify: {
      js: {
        src: ['_deploy/app.js'],
        dest: '_deploy/app.js'
      }
    }
  });

  //load tasks
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  //register default task
  grunt.registerTask('default', ['ngtemplates', 'concat']);//, 'concat', 'uglify']);
};
