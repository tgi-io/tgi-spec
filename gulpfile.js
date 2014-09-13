/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/gulpfile.js
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var childProcess = require('child_process');


// Source and packaging
var libFiles = [
  'lib/lib-header',
  'lib/tgi-spec.source.js',
  'lib/lib-footer'
];

// The Spec
var specFiles = [
  'lib/spec-header',
  'lib/tgi-spec.test.js',
  'lib/spec-footer'
];

// Build Task
gulp.task('build', function (callback) {
  gulp.src(libFiles)
    .pipe(concat('tgi.spec.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi.spec.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
  gulp.src(specFiles)
    .pipe(concat('tgi.spec-test.js'))
    .pipe(gulp.dest('dist'))
  callback();
});

// Lint Task
gulp.task('lint', function (callback) {
  gulp.src('dist/tgi.spec.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
  gulp.src('dist/tgi.spec-test.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
  callback();
});

// Test Task
gulp.task('test', ['build'], function (callback) {
  childProcess.exec('node spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    callback(error);
  });
});

// Default Task
gulp.task('default', ['build', 'lint', 'test']);