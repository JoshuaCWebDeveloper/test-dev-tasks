/* Ops.js
 * Class that holds dev-tasks operations and configuration
 * Dependencies: babili-webpack-plugin, child-process, eslint, extend, fs,
                 gulp, gulp-util, jcscript, nodegit, os, path, Q, webpack, yargs modules
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
    exec = require('child_process').exec,
    ESLintEngine = require("eslint").CLIEngine,
    extend = require("extend"),
    fs = require('fs'),
    gulp = require("gulp"),
    babel = require("gulp-babel"),
    gutil = require("gulp-util"),
    JCObject = require("jcscript").JCObject,
    Git = require("nodegit"),
    os = require('os'),
    path = require("path"),
    process = require("process"),
    Q = require('q'),
    webpack = require("webpack"),
    argv = require("yargs").argv;
//create operations class

var Ops = function () {
    function Ops() {
        _classCallCheck(this, Ops);

        //create object to hold configurations (specify defaults)
        this.__Config = new JCObject({
            appName: '',
            sourceDir: "src",
            buildDir: "build",
            bundleDir: "public/js",
            bundleName: "bundle",
            wpSingleEntryPoint: "./app/app.js",
            wpExtOptions: {},
            gitRemote: 'github',
            gitSrcBranch: 'release',
            gitCommitterName: 'DevTasks',
            gitCommitterEmail: 'coosriverjoshua1@outlook.com',
            gitTagName: function gitTagName(version) {
                return "v" + version;
            }
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
            wpConfig = extend(true, {
                //single entry point of app.js
                entry: this.__Config.get("wpSingleEntryPoint"),
                //output to public bundle.js
                output: {
                    path: path.resolve(process.cwd(), this.__Config.get("bundleDir")),
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
            }, this.__Config.get("wpExtOptions"));
            //if we are to minify
            if (minify) {
                //add minifier plugin
                wpConfig.plugins.push(new BabiliPlugin({
                    "builtIns": false
                }));
            }
            //out operation info
            gutil.log("Starting WebPack compiler, output to: " + wpConfig.output.path + "/" + wpConfig.output.filename);
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
    }, {
        key: "release",
        value: function release() {
            var _this = this;

            var bundleProps = this.__Config.get(['bundleName', 'bundleDir']),

            //set requirements for release
            reqs = {
                remote: this.__Config.get('gitRemote'),
                branch: this.__Config.get('gitSrcBranch'),
                modFiles: [bundleProps.bundleDir + "/" + bundleProps.bundleName + ".js", bundleProps.bundleDir + "/" + bundleProps.bundleName + ".min.js"]
            };
            //init object to store prop values
            var props = {
                appName: this.__Config.get('appName'),
                committer: {
                    name: this.__Config.get('gitCommitterName'),
                    email: this.__Config.get('gitCommitterEmail'),
                    signature: null
                },
                changelogName: './changelog-release.txt',
                type: '',
                git: {
                    repo: null,
                    remote: null,
                    index: null,
                    master: null,
                    head: null,
                    tree: null,
                    config: null,
                    username: '',
                    useremail: ''
                },
                changelogContents: '',
                tagName: ''
            };

            //parse type from args
            props.type = argv._.length ? argv._[1] : undefined;
            //if we didn't receive a valid type
            if (['major', 'minor', 'patch'].indexOf(props.type) < 0) {
                throw new Error("Missing required argument: 'major|minor|patch' (received: '" + props.type + "')");
            }
            //open the git repository, return promise of the following operations
            return Q(Git.Repository.open("./")).then(function (repo) {
                //SUCCESS
                //create collection of queries to perform at once
                var queries = [];
                //store repo
                props.git.repo = repo;
                //look for the required remote
                queries.push(Git.Remote.lookup(repo, reqs.remote).catch(function (err) {
                    //FAILURE
                    //ourput error, we couldn't find the right repo
                    throw new Error("Unable to find remote named '" + reqs.remote + "'. " + (err || ''));
                }));
                //check our current branch name
                queries.push(repo.getCurrentBranch());
                //check status of our repo
                queries.push(repo.getStatus());
                //check for existance of changelog-release.txt
                queries.push(Q.nbind(fs.readFile)(props.changelogName, 'utf8').catch(function (err) {
                    //FAILURE
                    throw new Error("Unable to find file " + props.changelogName + ". Create one following changelog specifications. " + (err || ''));
                }));
                //load the index for our repo
                queries.push(repo.refreshIndex());
                //load current HEAD
                queries.push(repo.getHeadCommit());
                //load the default git config
                queries.push(Git.Config.openDefault());
                //lookup the master branch
                queries.push(repo.getBranchCommit("master"));
                //return the result of all of our queries
                return Q.all(queries);
            }, function (err) {
                //FAILURE
                throw new Error("Not currently in app root directory, please cd. " + (err || ''));
            }).then(function (results) {
                //SUCCESS
                //create collection of tests to perform at once
                var tests = [],

                //get current branch from our second query
                curBranch = results[1],

                //get status from our third query
                status = results[2],
                    statusFail = false;
                //get the remote from our first query
                props.git.remote = results[0];
                //get the changelog data from our fourth query
                props.changelogContents = results[3];
                //get the index from our fifth query
                props.git.index = results[4];
                //get the head commit from our sixth query
                props.git.head = results[5];
                //get git config from our seventh query
                props.git.config = results[6];
                //get master commit from our eighth query
                props.git.master = results[7];
                //if our current branch isn't the required branch
                if (curBranch.shorthand() != reqs.branch) {
                    //then we aren't on the right branch
                    throw new Error("Branch '" + reqs.branch + "' not checked out.");
                }
                //filter status results, don't include untracked files
                status = status.filter(function (file) {
                    return file.status().indexOf("WT_NEW") < 0;
                });
                //if the length of the status is NOT the same as our requirement
                if (status.length != reqs.modFiles.length) {
                    //then we have failed
                    statusFail = true;
                } else {
                    //loop status results and make sure every one is a mod file
                    for (var i = 0; i < status.length; i++) {
                        //if this file isn't a modFile
                        if (reqs.modFiles.indexOf(status[i].path()) < 0) {
                            //then we have failed
                            statusFail = true;
                            break;
                        }
                    }
                }
                //if we have failed
                if (statusFail) {
                    throw new Error("Unrecognized or missing modified files. \nEnsure that all of and only the following files are modified: " + reqs.modFiles.join(', '));
                }
                //ensure that the merge base between our branch and master is master
                tests.push(Git.Merge.base(props.git.repo, props.git.head, props.git.master));
                //return results of all of our tests
                return Q.all(tests);
            }).then(function (results) {
                //SUCCESS
                //store baseOid from first test
                var baseOid = results[0];
                //if the base is NOT master
                if (!props.git.master.id().equal(baseOid)) {
                    throw new Error("Branch has diverged with master, unable to continue.");
                } //else, this is our last test and we are good to go!
                //bump the package.json version (using validated type argument)
                return Q.nbind(exec)("npm --no-git-tag-version version " + props.type);
            }).then(function () {
                //SUCCESS
                //create collection of ops to perform at once
                var ops = [];
                //add bundle.js, bundle.min.js, and package.json to index
                ops.push(props.git.index.addByPath('package.json'));
                ops.push(props.git.index.addByPath(bundleProps.bundleDir + "/" + bundleProps.bundleName + ".js"));
                ops.push(props.git.index.addByPath(bundleProps.bundleDir + "/" + bundleProps.bundleName + ".min.js"));
                //removed op, maintain indexes
                ops.push(1);
                //get user.name and user.email from git config
                ops.push(props.git.config.getStringBuf("user.name"));
                ops.push(props.git.config.getStringBuf("user.email"));
                //return result of all of ops
                return Q.all(ops);
            }).then(function (results) {
                //SUCCESS
                //create a collection of tasks to perform at once
                var tasks = [];
                //get the user's name and email from our fifth and sixth ops
                props.git.username = results[4];
                props.git.useremail = results[5];
                //write to the index
                tasks.push(props.git.index.write());
                //return result of all tasks
                return Q.all(tasks);
            }).then(function () {
                //SUCCESS
                //now that the files have been written to the index,
                //write them to the tree (for the commit)
                return props.git.index.writeTree();
            }).then(function (treeOid) {
                //SUCCESS
                //store tree
                props.git.tree = treeOid;
                //create a signature for the committer
                props.committer.signature = Git.Signature.now(props.committer.name, props.committer.email);
                //create a signature for the author
                var author = Git.Signature.now(props.git.username, props.git.useremail),

                //create a message for our commit
                message = "Update " + bundleProps.bundleName + ".js, " + bundleProps.bundleName + ".min.js, and package.json version";
                //commit our changes to HEAD
                return props.git.repo.createCommit("HEAD", author, props.committer.signature, message, props.git.tree, [props.git.head]);
            }).then(function (commitOid) {
                //SUCCESS
                //get newest package json contents
                var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8')),

                //create name of tag using current version
                tagName = _this.__Config.get('gitTagName')(packageJson.version),

                //create annotation from changelog, append header with app name and version
                annotation = props.appName + " " + tagName + " " + os.EOL + props.changelogContents,

                //init a collection of jobs to perform at once
                jobs = [];
                //save tage name
                props.tagName = tagName;
                //create a new tag for our commit
                jobs.push(props.git.repo.createTag(commitOid, tagName, annotation));
                //fast-forward our branch onto master (have already checked to ensure ff merge)
                jobs.push(props.git.repo.mergeBranches('master', reqs.branch, props.committer.signature));
                //update the changelog file
                jobs.push(Q.nbind(fs.writeFile)("./changelog-" + tagName + ".txt", annotation));
                jobs.push(Q.nbind(fs.unlink)(props.changelogName));
                //return the result of all jobs
                return jobs;
            }).then(function () {
                //SUCCESS
                //finally we can push everything to the remote, 
                //just use a git command, nodegit isn't ready for prime time
                return Q.nbind(exec)("git push " + reqs.remote + " master:master " + props.tagName);
            }).then(function () {
                gutil.log("\n\nSuccessfully released " + props.tagName + "!\n");
            });
        }
    }]);

    return Ops;
}();
//export ops class


exports.Ops = Ops;