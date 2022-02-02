const pkg = require('./package.json')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: [`node ${node}`],
        },
      },
    ],
  ],
}