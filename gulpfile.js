var gulp = require('gulp'),
  inject = require('gulp-inject'),
  bower = require('gulp-bower'),
  runSequence = require('run-sequence');

var config = {
  index: './index.html',
  assets: './assets',
  bowerDir: './bower_components'
}

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('copy', function() {
  gulp.src(['bower_components/vue/dist/vue.js', 'bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'bower_components/particles.js/particles.js'])
    .pipe(gulp.dest('assets/libs/'))
  gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css', 'bower_components/bootstrap/dist/css/bootstrap.css.map'])
    .pipe(gulp.dest('assets/css/'))
});

gulp.task('inject', function() {
  var target = gulp.src('./index.html');

  target
    .pipe(inject(gulp.src(['./assets/libs/vue.js', './assets/libs/jquery.js', './assets/libs/bootstrap.js', './assets/libs/particles.js'], {
      read: false
    }), {
      name: 'libs'
    }))
    .pipe(inject(gulp.src(['./app/components/*.js', './app/app.js', './app/*.js'], {
      read: false
    }), {
      name: 'app'
    }))
    .pipe(inject(gulp.src(['./assets/css/*.css', './assets/js/*.js'], {
      read: false
    })))
    .pipe(gulp.dest('./'));
});

gulp.task('build', function(cb) {
  runSequence('bower', 'copy', 'inject');
});
