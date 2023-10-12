const gulp              = require('gulp');
const autoprefixer      = require('gulp-autoprefixer');
const less              = require('gulp-less');
const cleanCSS          = require('gulp-clean-css');
const sourcemaps        = require('gulp-sourcemaps');
const gcmq              = require('gulp-group-css-media-queries');
const webp              = require('gulp-webp');
const rename            = require('gulp-rename');
const uglify            = require('gulp-uglify');
const babel             = require('gulp-babel');
const concat            = require('gulp-concat');
const gulpif            = require('gulp-if');
const del               = require('del');
const browserSync       = require('browser-sync').create();

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

let config = {
    src: './src',
    build: './build',
    html: {
        src: '/**/*.html',
        dest: '/'
    },
    fonts: {
        src: '/static/fonts/*',
        dest: '/static/fonts/'
    },
    js: {
        src: '/static/js/**/*.js',
        dest: '/static/js/'
    },
    img: {
        src: '/static/img/**/*',
        dest: '/static/img/'
    },
    css: {
        src: '/static/css/*',
        dest: '/static/css/'
    },
    less: {
        watch: '/static/less/**/*.less',
        src: '/static/less/styles.less',
        dest: '/static/css/'
    }
};

const html = () => {
    return gulp.src(config.src + config.html.src)
        .pipe(gulp.dest(config.build + config.html.dest))
        .pipe(gulpif(isSync, browserSync.stream()));
}

exports.html = html;

const styles = () => {
    return gulp.src(config.src + config.less.src)
        .pipe(less())
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(gcmq())
        .pipe(autoprefixer({
            overrideBrowserslist: ['defaults'],
            cascade: false
        }))
        .pipe(gulpif(isDev, gulp.dest(config.build + config.less.dest)))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulpif(isDev, sourcemaps.write('.')))
        .pipe(gulp.dest(config.build + config.less.dest))
        .pipe(gulpif(isSync, browserSync.stream()));
}

exports.styles = styles;

const grid = (done) => {
    delete require.cache[require.resolve('./smartgrid.js')];
    let settings = require('./smartgrid.js');
    smartgrid('./src/less', settings);
    done();
}

exports.grid = grid;

const img = () => {
    return gulp.src(config.src + config.img.src)
        .pipe(gulp.dest(config.build + config.img.dest));
}

exports.img = img;

const convertWebp = () => {
    return gulp.src(config.src + config.img.src)
        .pipe(webp({
            lossless: false
        }))
        .pipe(gulp.dest(config.build + config.img.dest));
}

exports.convertWebp = convertWebp;

const js = (done) => {
    let jsArray = [
        'src/static/js/helpers.js',
        'src/static/js/switch-theme.js',
        'src/static/js/slider.js',
        'src/static/js/animations/*.js',
        'src/static/js/main.js',
    ];

    return gulp.src(jsArray)
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulpif(isDev, sourcemaps.write('.')))
        .pipe(gulp.dest(config.build + config.js.dest))
        .pipe(gulpif(isSync, browserSync.stream()));
        done();
}

exports.js = js;

const fonts = () => {
    return gulp.src(config.src + config.fonts.src)
        .pipe(gulp.dest(config.build + config.fonts.dest));
}

exports.fonts = fonts;

const clean = () => {
    return del(['build/*']);
}

exports.clean = clean;

const watch = () => {
    if (isSync) {
        browserSync.init({
            server: {
                baseDir: config.build
            }
        });
    }

    gulp.watch(config.src + config.html.src, html);
    gulp.watch(config.src + config.less.watch, styles);
    gulp.watch(config.src + config.img.src, img);
    gulp.watch(config.src + config.js.src, js);
    gulp.watch('./smartgrid.js', grid);
}

exports.watch = watch;

const build = gulp.series(
    clean,
    gulp.parallel(
        html,
        styles,
        js,
        img,
        convertWebp,
        fonts,
    ),
);

exports.build = build;

exports.default = gulp.series(
    build,
    watch
);