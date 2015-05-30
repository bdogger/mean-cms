'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    project: {
      app: ['public/app'],
      css: ['<%= project.app %>/styles']
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'public/styles/application.css' :'public/styles/application.scss'
        }
      }
    },

    watch: {
      sass: {
        files: ['public/styles/{,*/}*.scss', 'bower.json'],
        tasks: ['sass:dev']
      }
    },

    wiredep: {
      task: {
        src: [
          'public/styles/**/*.scss',
          'app/views/**/*.ejs'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', ['watch']);

};