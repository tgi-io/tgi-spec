# Markdown
## Github flavorder that is
### Heading
#### Heading
This is the deal.  *what* _the_ /fuck/ This is github flavored markdown.  You can read about it here: https://github.com/github/markup
<h6>FOR EXAMPLE CHECK THIS CODE OUT</h6>
```javascript
/**---------------------------------------------------------------------------------------------------------------------
 * tgi-spec/gulpfile.js
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Source and packaging
var libFiles = [
  'lib/lib-header',
  'lib/tgi-spec.source.js',
  'lib/lib-footer'
];

// Lint Task
gulp.task('lint', function () {
  return gulp.src('dist/tgi.spec.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('build', function (callback) {
  gulp.src(libFiles)
    .pipe(concat('tgi.spec.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi.spec.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
  callback();
});

// Default Task
gulp.task('default', ['build', 'lint']);
```
<blockquote>
<strong>
log: eat<br>
log: more<br>
log: chiken<br>
</strong>
</blockquote>
