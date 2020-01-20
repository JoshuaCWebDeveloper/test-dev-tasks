/* gulpfile.js
 * Glup task-runner configruation for project
 * Dependencies: dev-tasks, gulp, gulp-util modules
 * Author: Joshua Carter
 * Created: January 19, 2019
 */
"use strict";
//include modules
var DevOps = require("dev-tasks"),
    gulp = require("gulp"),
    gutil = require("gulp-util");

//configure dev-tasks
DevOps.init({
    appName: 'test-dev-tasks',
    bundleDir: "dist",
    bundleName: "test-dev-tasks",
    wpSingleEntryPoint: "./src/index.js",
    wpExtOptions: {
        output: {
            library: "TestDevTasks",
            libraryTarget: "umd"
        }
    },
    gitSrcBranch: "develop",
    gitCommitterName: 'TestDevTasks',
    gitCommitterEmail: 'coosriverjoshua1@outlook.com'
});

//default gulp task: documentation
gulp.task('default', function () {
    gutil.log(
`

Available Gulp Commands:
 - lint
 - build
 - bundle
 - minify
 - release major|minor|patch
`
    );
});

//lint code using ESLint
gulp.task('lint', function () {
    return DevOps.lint();
});

//transpile code using babel
gulp.task('build', function () {
    //lint first
    DevOps.lint();
    return DevOps.build();
});

//build code using webpack and babel
gulp.task('bundle', function () {
    //lint first
    DevOps.lint();
    return DevOps.bundle();
});

//build our code and minify it using webpack and babili
gulp.task('minify', function () {
    //lint first
    DevOps.lint();
    //run build again
    return DevOps.bundle().then(function () {
        //now minify
        return DevOps.bundle("production", true);
    });
});

//create a new release and push it to master
gulp.task('release', function () {
    return DevOps.release().then(function () {
        return new Promise();
    });
});


//create dummy tasks so that we can use non-hyphentated arguments
var dummy = function () {
        return;
    },
    dummies = ['patch', 'minor', 'major'];
for (let i=0; i<dummies.length; i++) {
    gulp.task(dummies[i], dummy);
}
