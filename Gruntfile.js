const sass = require('node-sass')

module.exports = (grunt)=>{
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    './src/App.css': './src/App.scss'
                }
            }
        } 
    })
    grunt.loadNpmTasks('grunt-sass')
    grunt.registerTask("default", ['sass'])
}