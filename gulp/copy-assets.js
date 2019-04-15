/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp')

const config = require('./config.json')

gulp.task('copy-assets', function () {
  return gulp.src(['!' + config.paths.assets + 'sass{,/**/*}',
    config.paths.assets + '/**'])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-documentation', function () {
  return gulp.src(['!' + config.paths.docsAssets + 'sass{,/**/*}',
    config.paths.docsAssets + '/**'])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-v6', function () {
  return gulp.src(['!' + config.paths.v6Assets + 'sass{,/**/*}',
    config.paths.v6Assets + '/**'])
    .pipe(gulp.dest(config.paths.public + '/v6'))
})

var autocompleteAssets = [
  { src: config.paths.nodeModules + '/accessible-autocomplete/dist/accessible-autocomplete.min.js', dest: config.paths.public + '/vendor/accessible-autocomplete' },
  { src: config.paths.nodeModules + '/accessible-autocomplete/dist/accessible-autocomplete.min.js.map', dest: config.paths.public + '/vendor/accessible-autocomplete' },
  { src: config.paths.nodeModules + '/accessible-autocomplete/dist/accessible-autocomplete.min.css', dest: config.paths.public + '/vendor/accessible-autocomplete' }
]
gulp.task('copy-awesomecomplete', function (next) {
  autocompleteAssets.map(function (asset) {
    return gulp.src([asset.src])
      .pipe(gulp.dest(asset.dest))
  })
  next()
})
