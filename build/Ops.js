/* Ops.js
 * Class that holds dev-tasks operations and configuration
 * Dependencies: babili-webpack-plugin, eslint,
                 gulp, gulp-util, jcscript, path, Q, webpack, yargs modules
 * Author: Joshua Carter
 * Created: July 03, 2017
 */
"use strict";
//include modules

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BabiliPlugin = require("babili-webpack-plugin"),
    ESLintEngine = require("eslint").CLIEngine,
    gulp = require("gulp"),
    babel = require("gulp-babel"),
    gutil = require("gulp-util"),
    JCObject = require("jcscript").JCObject,
    path = require("path"),
    Q = require('q'),
    webpack = require("webpack"),
    argv = require("yargs").argv;
//create operations class

var Ops = function () {
    function Ops() {
        _classCallCheck(this, Ops);

        //create object to hold configurations (specify defaults)
        this.__Config = new JCObject({
            sourceDir: "src",
            buildDir: "build",
            bundleDir: "public/js",
            bundleName: "bundle",
            wpSingleEntryPoint: "./app/app.js"
        });
    }

    //init configuration for our Ops
    // - config (obj) A collection of configuration properties


    _createClass(Ops, [{
        key: "init",
        value: function init(config) {
            //update config
            this.__Config.update(config);
        }

        //check source code for errors

    }, {
        key: "lint",
        value: function lint() {
            //create new cli engine
            var cli = new ESLintEngine(),

            //execute lint on app directory
            lint = cli.executeOnFiles([this.__Config.get("sourceDir")]);
            //output results
            gutil.log("\n\n" + cli.getFormatter()(lint.results) + "\n");
            //if there were problems
            if (lint.errorCount || lint.warningCount) {
                //stop this madness
                throw new Error("Lint problems detected, unable to continue.");
            } else {
                //good job
                gutil.log("Your code is clean.");
            }
        }

        // Transpiles and bundles our app
        // - env (str) The environment to build for
        // - minify (bool) Whether or not to minify the build
        // - returns (Q) A Q promise

    }, {
        key: "bundle",
        value: function bundle(env, minify) {
            //default environment to development
            var env = env || "development",
                bName = this.__Config.get("bundleName"),

            //define filename
            outFn = minify ? bName + ".min.js" : bName + ".js",

            //define webpack config
            wpConfig = {
                //single entry point of app.js
                entry: this.__Config.get("wpSingleEntryPoint"),
                //output to public bundle.js
                output: {
                    path: path.resolve(__dirname, this.__Config.get("bundleDir")),
                    filename: outFn
                },
                module: {
                    rules: [
                    //transform app js files using babel
                    {
                        test: /\.js$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env', 'react']
                            }
                        }
                    },
                    //disable AMD support (use CommonJS)
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'imports-loader?define=>false'
                        }
                    }]
                },
                plugins: [new webpack.DefinePlugin({
                    "process.env.NODE_ENV": JSON.stringify(env)
                })]
            };
            //if we are to minify
            if (minify) {
                //add minifier plugin
                wpConfig.plugins.push(new BabiliPlugin({
                    "builtIns": false
                }));
            }
            //out operation info
            gutil.log("Starting WebPack compiler, output to: " + outFn);
            //create and run webpack compiler (use Q promise)
            return Q.nbind(webpack)(wpConfig).then(function (stats) {
                //output stats info
                gutil.log(stats.toString());
            }, function (err) {
                //log the error
                console.error(err.stack || err);
                //if we details
                if (err.details) {
                    //log them too
                    console.error(err.details);
                }
                //terminate
                throw new Error("Problems detected during build, unable to continue.");
            });
        }

        // Transpiles our app

    }, {
        key: "build",
        value: function build() {
            return gulp.src(this.__Config.get("sourceDir") + "/**").pipe(babel({
                presets: ['env']
            })).pipe(gulp.dest(this.__Config.get("buildDir") + "/"));
        }
    }]);

    return Ops;
}();
//export ops class


exports.Ops = Ops;