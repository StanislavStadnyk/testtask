var gulp = require('gulp'),
sass = require('gulp-sass'),
livereload = require('gulp-livereload'),
autoprefixer = require('gulp-autoprefixer'),
minifyCss = require('gulp-minify-css'),
rename = require('gulp-rename'),
connect = require ('gulp-connect'),
svgstore = require('gulp-svgstore'),
//svgSprite = require('gulp-svg-sprite'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant');
//uglify = require('gulp-uglify'),
//pseudoconcatJs = require('gulp-pseudoconcat-js'),
//concat = require('gulp-concat'),
//svgmin = require('gulp-svgmin');


//server connect
gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});
 
gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 versions', 'ie10'))
    .pipe(gulp.dest('./css'))

    .pipe(connect.reload());
});

gulp.task('minify-css', function() {
    gulp.src('css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('css/min'))
    .pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('index.html')
	.pipe(connect.reload());
	
})


gulp.task('svgstore', function(){
  return gulp
  .src('new-svg/*.svg')
  .pipe(svgmin())
  .pipe(svgstore())
  .pipe(rename({basename:'sprite'}))
  .pipe(gulp.dest('images'));
})

gulp.task('imagemin', () => {
   gulp.src('images/looking-4-parking/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('images/min/looking-4-parking'));

    
   
});




gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('**/*.scss', ['sass'])
  gulp.watch('*.html', ['html']);
  gulp.watch('css/*.css', ['minify-css']);
})

//default
gulp.task('default', ['connect', 'html', 'sass', 'sass:watch', 'minify-css']);
