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
  'lib/packaging/lib-header',
  'lib/tgi-spec.source.js',
  'lib/packaging/lib-footer'
];

// The Spec
var specFiles = [
  'lib/packaging/spec-header',
  'lib/tgi-spec.test.js',
  'lib/packaging/spec-footer'
];

gulp.task('libFiles', function () {
  return gulp.src(libFiles)
    .pipe(concat('tgi.spec.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi.spec.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('specFiles', function () {
  return gulp.src(specFiles)
    .pipe(concat('tgi.spec-test.js'))
    .pipe(gulp.dest('dist'));
});

// Build Task
gulp.task('build', ['libFiles', 'specFiles'], function (callback) {
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

// Coverage Task
gulp.task('cover', function (callback) {
  childProcess.exec('istanbul cover spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    callback(error);
  });
});

// Default Task
gulp.task('default', ['build', 'lint', 'test']);