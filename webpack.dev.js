import path from "path";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import publicPath from "./publicPath.js";

const devConfig = () => {
  // Development-specific configuration
  return {
    mode: "development",
    devtool: "inline-source-map", // Enable source maps for easier debugging
    devServer: {
      static: path.join(__dirname, "dist"), // Serve files from the dist directory
      compress: true, // Enable gzip compression for better performance
      port: 3000, // Port for the development server
      open: [publicPath], // Open the application in the browser at the specified public path
      historyApiFallback: {
        index: publicPath, // Fallback to the public path for single-page applications
        disableDotRule: true, // Disable the dot rule to allow for deeper paths
      },
      hot: true, // Enable Hot Module Replacement for faster development
      client: {
        overlay: {
          errors: true, // Show errors in the browser overlay
          warnings: false, // Do not show warnings in the browser overlay
        },
      },
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
      },
    },
  };
};

export default (env) => merge(commonConfig(), devConfig(env));
