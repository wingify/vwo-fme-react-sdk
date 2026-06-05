const banner2 = require('rollup-plugin-banner2');
const alias = require('@rollup/plugin-alias');
const replace = require('@rollup/plugin-replace');
const path = require('path');

module.exports = {
  rollup(config, options) {
    const brand = process.env.BRAND || 'vwo';
    const isWingify = brand === 'wingify';

    // 1. Inject __SDK_BRAND__ at build time
    config.plugins.unshift(
      replace({
        preventAssignment: true,
        __SDK_BRAND__: JSON.stringify(brand),
      })
    );

    // 2. For Wingify build: redirect ./sdk to ./sdk.wingify
    if (isWingify) {
      config.plugins.unshift(
        alias({
          entries: [{
            find: /^\.\/sdk$/,
            replacement: path.resolve(__dirname, 'lib/sdk.wingify.ts'),
          }]
        })
      );
    }

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
