import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

const prodConfig = () => {
  return {
    mode: "production", // Set the mode to production for optimizations
    optimization: {
      minimize: true, // Enable minimization of the output files
      splitChunks: {
        chunks: "all", // Split chunks for better caching and performance
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/, // Match node_modules for vendor chunking
            name: "vendors", // Name of the vendor chunk
            priority: -10, // Lower priority for vendor chunks
          },
          default: {
            minChunks: 2, // Minimum number of chunks to share a module
            priority: -20, // Lower priority for default chunks
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot)$/, // Match font files
          type: "asset/resource", // Use asset/resource for font files
          generator: {
            filename: "fonts/[name][ext]", // Output path for font files
          },
        },
      ],
    },
  };
};

export default (env) => merge(commonConfig(), prodConfig(env));
