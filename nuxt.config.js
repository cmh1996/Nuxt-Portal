// const webpack = require('webpack')

module.exports = {
  head: {
    title: 'TWO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    { src: '~assets/css/common.less', lang: 'less' },
    { src: '~assets/font/iconfont.css'}
  ],

  loading: { color: '#3B8070' },

  transition: 'fade',
  
  cache: {
    max:1000,
    maxAge:900000
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  //plugins: ['~plugins/axios'],

  build: {
    //输出的文件名
    filenames: {
      vendor: 'vendor.[hash].js',
      app: 'app.[chunkhash].js'
    },
    //publicpath设置
    //publicPath: 'https://xxx.com',
    //babel配置
    babel:{
      presets:['es2015','stage-0']
    },
    //postcss配置
    postcss:[
      require('autoprefixer')({
        browsers:['last 3 versions']
      })
    ],
    //webpack分析打包文件的大小
    analyze:true,
    //三方库
    vendor: ['axios', 'babel-polyfill'],
    //loaders
    loaders: [
        {
            test: /\.(less)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 1000,
                name: 'img/[name].[hash:7].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }
    ],
    //webpack的plugins
    /*plugins:[
      new webpack.DefinePlugin({

      })
    ],*/
    //eslint
    /*extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }*/
  },
}