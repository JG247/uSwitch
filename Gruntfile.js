///**
// * Created by jgpro_000 on 06/09/14.
// */
//module.exports = function(grunt) {
//    // Do grunt-related things in here
//    grunt.initConfig({
////        karma: {
////            unit: {
////                configFile: 'karma.conf.js',
////                background: true
////            }
////        },
////        watch: {
////            //run unit tests with karma (server needs to be already running)
////            karma: {
////                files: ['app/js/**/*.js', 'js/tests/*spec.js'],
////                tasks: ['karma:unit:run'] //NOTE the :run flag
////            },
////            css: {
////                files: 'assets/scss/*.scss',
////                tasks: ['compass']
////            }
////        },
////        sass: {
////            dist: {
////                options: {
////                    sassDir: 'assets/scss',
////                    cssDir: 'assets/css',
////                    environment: 'development',
////                    outputStyle: 'compressed'
////                }
////            }
////        }
//        sass: {
//            dist: {
//                files: {
//                    'assets/css/covestor.css' : 'assets/scss/covestor.scss'
//                }
//            }
//        },
//        watch: {
//            css: {
//                files: 'assets/scss/*.scss',
//                tasks: ['sass']
//            }
//        }
//
//    });
//    grunt.loadNpmTasks('grunt-karma');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-compass');
//    grunt.registerTask('default', ['sass']);
//};

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },
        watch: {
            sass: {
                files: ['*.scss','scss/**/*.{scss,sass}','scss/images/_*.{scss,sass}','scss/**/*.{scss,sass}','sass/*.{scss,sass}'],
                tasks: ['sass:dist']
            },
            livereload: {
                files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: ['app/js/**/*.js', 'js/**/**/**/*spec.js'],
                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },
        sass: {
            options: {
                sourceComments: 'map',
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'assets/css/main.css': 'assets/scss/main.scss',
                    'assets/css/main.tablet.css': 'assets/scss/main.tablet.scss',
                    'assets/css/main.desktop.css': 'assets/scss/main.desktop.scss'
                }
            }
        }
    });
    grunt.registerTask('default', ['sass:dist', 'watch']);
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
};