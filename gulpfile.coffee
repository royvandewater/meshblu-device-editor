gulp      = require 'gulp'
coffee    = require 'gulp-coffee'
concat    = require 'gulp-concat'
eco       = require 'gulp-eco'
webserver = require 'gulp-webserver'
gutil     = require 'gulp-util'

COFFEE_FILES = [
  './src/config.coffee'
  './src/models/*.coffee'
  './src/collections/*.coffee'
  './src/views/*.coffee'
  './src/routers/*.coffee'
  './src/application.coffee'
]

gulp.task 'coffee', ->
  gulp.src COFFEE_FILES
      .pipe(coffee()).on('error', gutil.log)
      .pipe(concat('application.js'))
      .pipe(gulp.dest('./dist'))

gulp.task 'eco', ->
  gulp.src ['templates/*.eco']
      .pipe(eco())
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('./dist'))

gulp.task 'webserver', ->
  gulp.src ['.']
      .pipe webserver(livereload: true)

gulp.task 'default', ['coffee', 'eco'], ->

gulp.task 'watch', ['coffee', 'eco', 'webserver'], ->
  gulp.watch COFFEE_FILES, ['coffee']
  gulp.watch ['templates/*.eco'], ['eco']
