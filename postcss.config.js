const AUTOPREFIXER_BROWSERS = [
  'last 2 Chrome versions',
  'last 2 Firefox versions',
  'Explorer >= 11',
  'last 2 Edge versions',
  'last 2 iOS versions',
  'last 2 Safari versions'
];

module.exports = {
  plugins: {
    'postcss-cssnext': {
      browsers: AUTOPREFIXER_BROWSERS
    }
  }
};
