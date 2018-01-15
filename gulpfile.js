var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')({ camelize: true });
var cleanCSS    = require('gulp-clean-css');
var bs          = require('browser-sync');
var connect     = require('gulp-connect-php');
var reload      = bs.reload;
var pngquant    = require('imagemin-pngquant');
var gutil       = require('gulp-util');
var ftp         = require( 'vinyl-ftp' );
var livereload = require('gulp-livereload');

var config = {
    ftp: {
        host: '',
        user: '',
        password: ''
    },
    server: {
        base: './',
        port: 8010,
        host: 'local.dev'
    },
    bs: {
        port: 8080,
        logLevel: "info",
        tunnel: false
    }
};

var paths = {
    root_path: './',
    bower: './bower_components',
    assets: './',
    tpl: {
        watch: [
            './*.php',
            './templates/*',
            './**/*.html',
            '!./build/**/*',
            '!./build-dev/**/*'
        ]
    },
    sass2: {
        watch: [
            './css/scss/**/*.scss'
        ],
        src: [
            './css/scss/header.scss',
            './css/scss/banner.scss',
            './css/scss/home.scss',
            './css/scss/footer.scss'
        ],
        dist: './css/dist/'
    },
    sass: {
        watch: [
            './css/scss/**/*.scss'
        ],
        src: [
            './css/scss/style.scss'
        ],
        dist: './css/'
    },
    css: {
        watch: [
            './css/*.css'
        ],
        src: [
            './css/*.css',
            './css/style.css'
        ],
        dist: './css/dist/'
    },
    js: {
        check: [
            './js/*.js'
        ],
        src: [
            //'./bower_components/slick-carousel/slick/slick.min.js',
            //'./bower_components/gsap/src/minified/TweenMax.min.js',
            //'./bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js',
            //'./bower_components/gsap/src/minified/plugins/CSSPlugin.min.js',
            //'./js/vendor/jquery.matchHeight.js',
            //'./js/vendor/anijs-min.js',
            //'./js/vendor/anijs-helper-scrollreveal-min.js',
            './js/app.js'
        ],
        dist: './js/dist/'
    }
};

gulp.task('default', ['watch']);

gulp.task('sass2', function () {

    console.log("on construit les parties");

    return gulp.src(paths.sass2.src)
        .pipe(plugins.sass())
        // .pipe(plugins.autoprefixer({ browsers: [ 'last 2 version', 'ff > 20', '> 1%', 'ie 9', 'ie 10']}))
        // .pipe(cleanCSS({
        //     keepSpecialComments: 0
        // }))
        .on('error', plugins.sass.logError)
        .pipe(gulp.dest(paths.sass2.dist));
});

gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
    .pipe(plugins.concat('style.scss'))
        .pipe(plugins.sass())
        .on('error', plugins.sass.logError)
        .pipe(gulp.dest(paths.sass.dist));
});

gulp.task('cssParts', ['sass2'], function(){
    console.log("css Parts");
    /*return gulp.src(paths.sass2.dist)
        .pipe(plugins.autoprefixer({ browsers: [ 'last 2 version', 'ff > 20', '> 1%', 'ie 9', 'ie 10']}))
        .pipe(cleanCSS({
            keepSpecialComments: 0
        }))
        .on('end', function () {

        });*/

});

gulp.task('css', ['sass'], function(){
    return gulp.src(paths.css.src)
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.autoprefixer({ browsers: [ 'last 2 version', 'ff > 20', '> 1%', 'ie 9', 'ie 10']}))
/*
        .pipe(cleanCSS({
            keepSpecialComments: 0
        }))
*/
        .pipe(gulp.dest(paths.css.dist))
        .on('end', function () {
            gulp.src(paths.sass.dist + '*.css', {read: false})
                .pipe(plugins.clean());
        });

});

gulp.task('checkJS', function(){
    return gulp.src(paths.js.check)
        .pipe(plugins.plumber());
});

gulp.task('js', ['checkJS'], function () {
    return gulp.src(paths.js.src)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('app.min.js'))
        //.pipe(plugins.uglify())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(livereload());
});

gulp.task('watch', ['js', 'css'], function () {
    gulp.watch(paths.sass.watch, ['css']).on('change', reload);
    gulp.watch(paths.sass.watch, ['cssParts']).on('change', reload);
    gulp.watch(paths.js.src, ['js']).on('change', reload);
});