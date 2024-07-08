const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "os": false
    }
  },
  module: {
    rules: [
      // Ihre anderen Regeln hier
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env', // Pfad zu .env-Datei (dies ist der Standardwert)
      safe: true, // Optionale Sicherungsdatei (falls vorhanden)
    })
  ]
};
