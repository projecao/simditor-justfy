module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'
    name: "simditor-alignments"

    coffee:
      src:
        options:
          bare: true
        files:
          'lib/<%= name %>.js': 'src/<%= name %>.coffee'
      spec:
        files:
          'spec/<%= name %>-spec.js': 'spec/<%= name %>-spec.coffee'

    umd:
      all:
        src: 'lib/<%= name %>.js'
        template: 'umd.hbs'
        amdModuleId: '<%= pkg.name %>'
        objectToExport: 'AlignmentsButton'
        globalAlias: 'AlignmentsButton'
        deps:
          'default': ['$', 'Simditor']
          amd: ['jquery', 'simditor']
          cjs: ['jquery', 'simditor']
          global:
            items: ['jQuery', 'Simditor']
            prefix: ''

    watch:
      spec:
        files: ['spec/**/*.coffee']
        tasks: ['coffee:spec']
      src:
        files: ['src/**/*.coffee']
        tasks: ['coffee:src', 'umd']


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['coffee', 'umd', 'watch']
  grunt.registerTask 'test', ['coffee', 'umd']
