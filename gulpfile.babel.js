const gulp = require("gulp");
const plumber = require("gulp-plumber");
const bs = require("browser-sync");

gulp.task("default", () => {
  bs.init({
    server: {
      baseDir: ["."],
      directory: true
    },
    notify: false,
    host: "localhost"
  });
  
  gulp.watch("./*.html", ["reload"]);
  gulp.watch("./js/*.js", ["reload"]);
  gulp.watch("./css/*.css", ["reload"]);
});

gulp.task("reload", function() {
  bs.reload();
});
