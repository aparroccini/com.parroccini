var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');


gulp.task('build-css', function() {

    gulp.src('./web/assets/sass/screen.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 25 versions']
        }))
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./web/assets/build/css'));

});

gulp.task('build-js', function() {

    gulp.src(['./web/assets/js/vendor/*.js', './web/assets/js/plugins.js', './web/assets/js/main.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./web/assets/build/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./web/assets/build/js'));

});

gulp.task('build-img', function() {
    gulp.src('./web/assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./web/assets/build/img'));
});

gulp.task('watch', function(){

    gulp.watch('./web/assets/sass/**/*.sass', ['build-css']);
    gulp.watch('./web/assets/js/**/*.js', ['build-js']);

});

gulp.task('default', ['build-css', 'build-img', 'build-js', 'watch']);
