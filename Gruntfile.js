/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      global: {
        options: {
          style: "compressed"
        },
        files: {
          "_site/css/global-unprefixed.css": "scss/global.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "_site/css/global-unprefixed.css",
        dest: "_site/css/global.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl=http://localhost:4000"
      },
      jekyllBuild: {
        command: "jekyll build --baseurl=http://localhost:4000"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ["**/*.md", "index.html", "**/*.html"],
        tasks: ["shell:jekyllBuild", "sass", "autoprefixer"]
      },
      css: {
        files: ["scss/*.scss"],
        tasks: ["sass", "autoprefixer"]
      },
      svg: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild", "sass", "autoprefixer"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        svg: {
          style: "display: none;"
          // maybe weird xmlss garbage?
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("default", ["shell:jekyllBuild", "sass", "autoprefixer", "svgstore", "watch"]);

};
