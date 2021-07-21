if (process.env.NODE_ENV === 'production') {
  require('./dist')
} else {
  let nodemon = require('nodemon')
  nodemon({
    script: 'dev.js',
    delay: '500ms',
    ext: 'js json',
    ignore: ["*.test.js"],
  })
  nodemon.on('start', function () {
    console.log('nodemon says: Server has started');
  }).on('quit', function () {
    console.log('nodemon says: Server has quit');
    process.exit();
  }).on('restart', function (files) {
    console.log('nodemon says: Server restarted due to: ', files);
  });
}