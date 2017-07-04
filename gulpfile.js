/* gulpfile.js
 * Glup task-runner configruation for project
 * Dependencies: eslint, gulp, gulp-babel, gulp-util modules
 * Author: Joshua Carter
 * Created: July 04, 2017
 */
"use strict";
//include modules
var ESLintEngine = require("eslint").CLIEngine,
    gulp = require("gulp"),
    babel = require("gulp-babel"),
    gutil = require("gulp-util");

//create operations object
var Ops = {
    lint: function () {
        //create new cli engine
        var cli = new ESLintEngine(),
            //execute lint on app directory
            lint = cli.executeOnFiles(["src", "test"]);
        //output results
        gutil.log(
`

${cli.getFormatter()(lint.results)}
`
        );
        //if there were problems
        if (lint.errorCount || lint.warningCount) {
            //stop this madness
            throw new Error("Lint problems detected, unable to continue.");
        }
        else {
            //good job
            gutil.log(`Your code is clean.`);
        }
    },
    // Transpiles our app
    build: function () {
        return gulp.src('src/**')
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('build/'));
    }
};


//default gulp task: documentation
gulp.task('default', function () {
    gutil.log(
`

Available Gulp Commands:
 - lint
 - build
`
    );
});

//lint code using ESLint
gulp.task('lint', Ops.lint);

//build code using webpack and babel
gulp.task('build', Ops.build);
