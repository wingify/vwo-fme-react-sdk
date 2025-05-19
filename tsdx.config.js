const banner2 = require('rollup-plugin-banner2');

module.exports = {
  rollup(config, options) {
    // Remove the Terser plugin if present
    // if (options.env === "production") {
    //   config.plugins = config.plugins.filter(plugin => plugin.name !== "terser");
    // }
    config.plugins.push(
      banner2(() => {
        return `
/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
`;
      })
    );

    return config;
  },
};
