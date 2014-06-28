var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    livereload   = require('gulp-livereload'),
    lr           = require('tiny-lr'),
    server       = lr();

// JS Helpers
var _      = require('lodash'),
    fs     = require('fs'),
    sh     = require('shelljs'),
    argv   = require('yargs').argv,
    moment = require('moment');

/**
 * Compile sass and reload the page. This takes the extra step of sending the
 * css into _site/ which would otherwise only be done by using `jekyll build`.
 * I save the compiled css to both locations so that during an actual build the
 * result will be exactly the same.
 */
gulp.task('sass', function() {
  return gulp.src('sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
    .pipe(minifycss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(gulp.dest('_site/public/css'))
    .pipe(livereload(server));
});

/**
 * Create a new post using the standard jekyll naming conventions. This command
 * does not actually create the post, but rather opens a vim buffer for the file
 * to be created. Nothing is saved unless you save in Vim.
 *
 * @example
 * gulp new -t 'This is the post title' => _posts/YYYY-MM-DD-this-is-the-post-title.md
 */
gulp.task('new', function() {
  if (!argv.t) {
    throw new gutil.PluginError('gulp', [ "",
      "Error: No title.",
      "Usage: gulp new -t 'Some awesome post'", ""
    ].join("\n"));
  }

  var date     = moment().format('YYYY-MM-DD'),
      title    = argv.t.toLowerCase().replace(/\s/g, '-'),
      filename = date + '-' + title + '.md';

  sh.exec( "mvim _posts/" + filename);
});

/**
 * List all posts.
 */
gulp.task('list', function() {
  var posts = sh.ls('_posts/').reverse();

  _.each(posts, function(postName, i) {
    var date  = postName.slice(0, 10),
        title = postName.replace(/\d{4}-\d{2}-\d{2}-/g, '');

    gutil.log([
      i+1 + '.',
      title.slice(0, -3),
      '('+ date +')'
    ].join(' '));
  });
});

gulp.task('build', function build() { sh.exec('jekyll build'); });

gulp.task('watch', function() {
  server.listen(35729, function(err) {
    if (err)
      return console.log(err);

    gulp.watch('sass/**/*.scss', ['sass']);

    gulp.watch([
      '_includes/**/*.html',
      '_layouts/**/*.html',
      '_posts/**/*'
    ], ['build']);

  });
});

gulp.task('default', ['build', 'watch']);
