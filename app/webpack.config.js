module.exports = {
	entry: "./components/m.jsx",
	output: {
		filename: "../public/js/bundle.js"
	},
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
	 module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        loaders: [
          'babel-loader?stage=0'
        ],
      },
    ],
  },
  devtool: 'source-map',

};
