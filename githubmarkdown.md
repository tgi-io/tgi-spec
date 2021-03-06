#[What is the point?](#-point-is-this)
<div align="center"><H2>WHAT IT BE</H2></div>
<div align="center"><H4>
[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#)
</H4></div>
## Github flavorder that is
### Heading
#### Heading
This is the deal.  *italic* **bold** This is github flavored markdown.  You can read about it here: https://github.com/github/markup
## Emoji
Github supports Emoji :secret:
check it out 
[here :link:](http://www.emoji-cheat-sheet.com "Emoji cheat sheet")

##Unicode
#[&#8595;](#)&nbsp;[&#9786;](#)&nbsp;[&#8593;](#) Unicode be here
#[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#) Unicode be here
##[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#) Unicode be here
## Unicode be here [&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#)
###[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#) Unicode be here
####[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#) Unicode be here
#####[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#) Unicode be here
######[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#) Unicode be here
#######[&#9664;](#)&nbsp;[&#8984;](#)&nbsp;[&#9654;](#) Unicode be here
#TOC
[[first](#)]
[second](#)
[third](#)
#Lists
ol, ul, li, dl, dt, dd
<ul></ul>
<ul>
  <li>second item first subitem</li>
  <li>second item second subitem</li>
  <li>second item third subitem</li>
</ul>
<dl>
  <dt>Firefox</dt>
  <dt>Mozilla Firefox</dt>
  <dt>Fx</dt>
  <dd>A free, open source, cross-platform, graphical web browser
      developed by the Mozilla Corporation and hundreds of volunteers.</dd>

  <!-- other terms and definitions -->
</dl>
#Tables

You can create tables by assembling a list of words and dividing them with hyphens - (for the first row), and then separating each column with a pipe |:

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
For aesthetic purposes, you can also add extra pipes on the ends:

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

Note that the dashes at the top don't need to match the length of the header text exactly:

| Name | Description          |
| ------------- | ----------- |
| Help      | Display the help window.|
| Close     | Closes a window     |

You can also include inline Markdown such as links, bold, italics, or strikethrough:

| Name | Description          |
| ------------- | ----------- |
| Help      | ~~Display the~~ help window.|
| Close     | _Closes_ a window     |

Finally, by including colons : within the header row, you can define text to be left-aligned, right-aligned, or center-aligned:

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

A colon on the left-most side indicates a left-aligned column; a colon on the right-most side indicates a right-aligned column; a colon on both sides indicates a center-aligned column.

Task lists

Lists can be turned into task lists by prefacing list items with [ ] or [x] (incomplete or complete, respectively).

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> are supported
- [x] list syntax is required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item
Task lists render with checkboxes in all comments and Markdown files. Select or unselect these checkboxes to mark them as complete or incomplete across GitHub.

Task lists can be nested to better structure your tasks:

- [ ] a bigger project
  - [ ] first subtask #1234
  - [ ] follow up subtask #4321
  - [ ] final subtask cc @mention
- [ ] a separate task
Task lists can be nested to arbitrary depths, though we recommend nesting at most once or twice; more complicated tasks should be broken out into separate lists.



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
Hey you can go [#heading](#heading)
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
<p>I'm sorry but sometimes spam is needed</p>
#[&#8593;](#what-is-the-point)&nbsp;[&#8595;](#what-is-the-point)[&#119582;](#what-is-the-point) Point Is this
The point is to test how anchors with with this funky thing called github flavored markdown.
