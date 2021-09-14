#!/usr/bin/env node

/**
 * CODE MODIFIED FROM
 * Creating node bin scripts:
 * - https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
 * 
 * Starting webpack dev server from node:
 * - https://github.com/webpack/webpack-dev-server/tree/master/examples/api/simple
 */

// const args = process.argv;
const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');

// Paths
const cwd = process.cwd();
const appDefinitionsPath = path.join(cwd, 'webpack.config');
const webpackConfigPath = path.join(__dirname, 'src/webpack.config');

// Get configs
const { moduleFederationConfig, webpackConfigMixin } = require(appDefinitionsPath);
const getWebpackConfig = require(webpackConfigPath);
const webpackConfig = getWebpackConfig(webpackConfigMixin, moduleFederationConfig);
  
// Start WebpackDevServer
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(webpackConfig.devServer, compiler);

server.startCallback(() => {
  const port = webpackConfig.devServer.port || 8080;
  const protocol = webpackConfig.devServer.secure ? 'https' : 'http';
  const pathname = webpackConfig.output.publicPath;
  
  console.log(`Starting server on ${protocol}://localhost:${port}${pathname}`);
});