// module.exports = function override(config, env) {
// 	config.module.rules.push({
// 		test: /\.worker\.js$/,
// 		use: { loader: 'worker-loader' }
// 	})
// 	return config;
// }

module.exports = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.worker\.js$/,
			use: { loader: 'worker-loader' }
		})

		return config
	}
}