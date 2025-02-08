module.exports = {
  rollup(config, options) {
    // Remove the Terser plugin if present
    if (options.env === "production") {
      config.plugins = config.plugins.filter(plugin => plugin.name !== "terser");
    }
    return config;
  },
};
