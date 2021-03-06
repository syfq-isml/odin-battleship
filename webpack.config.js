const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				use: [
					{
						options: {
							name: "[name].[hash].[ext]",
							// outputPath: "imgs",
						},
					},
				],
			},
		],
	},
	devtool: "inline-source-map",
	plugins: [
		new HtmlWebpackPlugin({
			title: "Battleships | TheOdinProject",
			filename: "index.html",
			template: "src/template.html",
		}),
	],
};
