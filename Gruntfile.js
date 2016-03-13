module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'

      },
      dist: {
        src: [
          'dist/news.js',
          'dist/news.controller.js',
          'dist/news.directive.js',
          'dist/new.model.service.js',
          'dist/news.service.js'
        ],
        dest: '<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      ignore_warning: {
        options: {
          '-W083': true,
        },
        src: ['dist/news.service.js'],
      },
      files: ['Gruntfile.js', 'dist/**/*.js', 'specs/**/*.js'],
      options: {
        loopfunc:true,
        globals: {
          jQuery: true,

        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
