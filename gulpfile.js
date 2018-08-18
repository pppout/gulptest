const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: "./src"
//        proxy: "http://localhost:80/..."
    });

    gulp.watch(["node_modules/bootstrap/scss/bootstrap.scss", "src/sass/*.s[ca]ss"], ['sass']);
    gulp.watch("src/*.php").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('sass', () => {
    return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss", "src/sass/*.s[ca]ss"])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                     'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
        .pipe(gulp.dest("src/js"));
});

gulp.task('default', ['js', 'serve']);

