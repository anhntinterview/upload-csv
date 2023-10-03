module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
    'tailwindcss/nesting': 'postcss-nesting',
    'tailwindcss': {},
    'postcss-custom-properties': {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
