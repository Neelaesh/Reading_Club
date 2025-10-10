import ESLintPlugin from "eslint-webpack-plugin";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import publicPath from "./publicPath.js";

export default () => {
  return {
    entry: {
      app: "./src/index.tsx", // Entry point for the application
    },
    output: {
      filename: "[name].bundle.js", // Output filename for the main bundle
      chunkFilename: "[name].chunk.js", // Output filename for additional chunks
      path: path.resolve(__dirname, "dist"), // Output directory for the build
      publicPath: publicPath, // Public path for serving the application
      clean: true, // Clean the output directory before each build
      pathinfo: true, // Include path information in the output for better debugging
      assetModuleFilename: "assets/[hash][ext][query]", // Output path for assets
    },
    resolve: {
      extensions: [".ts", ".tsx", ".json", "..."], // Resolve these extensions
      alias: {
        "@": path.resolve(__dirname, "src"), // Alias for the src directory
        components: path.resolve(__dirname, "src", "components"), // Alias for components directory
        utils: path.resolve(__dirname, "src", "utils"), // Alias for utils directory
        styles: path.resolve(__dirname, "src", "styles"), // Alias for styles directory
      },
      cacheWithContext: false, // Disable context caching for better build performance
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/, // Match TypeScript files
          //exclude: /node_modules/, // Exclude node_modules from processing
          include: path.resolve(__dirname, "src"), // Include only the src directory
          loader: "ts-loader", // Use ts-loader for TypeScript files
          options: {
            transpileOnly: true, // Speed up builds by skipping type checking
            compilerOptions: {
              module: "esnext", // Use ESNext module system for better tree-shaking
            },
          },
        },
        {
          enforce: "pre", // Run this rule before others
          test: /\.js$/, // Match JavaScript files
          //exclude: /node_modules/, // Exclude node_modules from processing
          include: path.resolve(__dirname, "src"), // Include only the src directory
          loader: "source-map-loader", // Use source-map-loader to extract source maps
        },
        {
          test: /\.css$/, // Match CSS files
          use: ["style-loader", "css-loader"], // Use style-loader and css-loader for CSS files
          sideEffects: true, // Indicate that CSS files have side effects
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "all", // Split all chunks (async and initial)
        minSize: 20000, // Minimum size for a chunk to be generated
        maxSize: 100000, // Maximum size for chunks
        minChunks: 1, // Minimum number of chunks that must share a module before splitting
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // Match modules in node_modules
            name(module) {
              // Get the name of the package
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            },
            priority: -10, // Lower priority for vendor chunks
            reuseExistingChunk: true, // Reuse existing chunks if possible
          },
          default: {
            minChunks: 2, // Minimum number of chunks that must share a module before splitting
            priority: -20, // Lower priority for default chunks
            reuseExistingChunk: true, //
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        filename: "index.html",
        inject: "body",
        scriptLoading: "defer",
        hash: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new ESLintPlugin({
        extensions: ["ts", "tsx"],
        emitWarning: true,
        failOnError: false,
      }),
    ],
  };
};
