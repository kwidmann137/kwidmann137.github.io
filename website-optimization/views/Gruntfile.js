/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            /* Change these */
            width: 800,
            name: '1x',
            quality: 30
          }, {
            /* Change these */
            width: 1600,
            name: '2x',
            quality: 30
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images',
          custom_dest: 'images/{%= name %}'
        }]
      }
    },

	/* inline critical CSS */
    critical: {
      dist: {
        options: {
          base: './',
          dimensions: [{
            height: 400,
            width: 480
          }, {
            height: 600,
            width: 768
          }, {
            height: 800,
            width: 992
          }]
        },
        src: 'pizza.html',
        dest: 'result.html'
      }
    },


    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-critical');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images', 'critical']);


};
