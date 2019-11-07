const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const fetchEarthquakeData = require('./app/js/utils/fetchEarthquakeData')

module.exports = {
  exportPathMap: async () => {
    const chartData = await fetchEarthquakeData()
    return {
      '/': {
        page: '/',
        query: {
          chartData,
        },
      },
    }
  },
  webpack: (config, { dev }) => {
    console.warn(`Enviroment: ${dev ? 'DEVELOPMENT' : 'PRODUCTION'}`)

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    })

    config.module.rules.push({
      test: /\.(jpe?g|png|gif|ico|svg|webp)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: 'file-loader',
            publicPath: '/_next/static/images',
            outputPath: 'static/images',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    })

    // Silence mini-css-extract-plugin generating lots of warnings for CSS ordering.
    // We use CSS modules that should not care for the order of CSS imports, so we
    // should be safe to ignore these.
    //
    // See: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    )

    return config
  },
}
