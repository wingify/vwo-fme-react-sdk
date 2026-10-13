/**
 * Copyright 2025-2026 Wingify Software Pvt. Ltd.
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

/**
 * Single entry point for the `@wingify/*` packages used by the SDK.
 *
 * These packages are published only as CommonJS bundles. Bundlers (webpack, Vite, Jest) expose their exports as
 * named exports, but Node's native ESM loader (used during SSR) only exposes them under `default`, so named
 * imports such as `import { LogManager } from '@wingify/service-logger'` fail there. Always import them from here.
 */
// The local names `serviceLogger` / `utilDataType` are also the UMD build's global names; keep them unchanged.
import * as serviceLogger from '@wingify/service-logger';
import * as utilDataType from '@wingify/util-data-type';

function resolveExports(module: any, probeKey: string): any {
  return module && module[probeKey] ? module : module.default;
}

const serviceLoggerExports = resolveExports(serviceLogger, 'LogManager');
const utilDataTypeExports = resolveExports(utilDataType, 'isObject');

export const LogManager = serviceLoggerExports.LogManager;
export type LogManager = InstanceType<typeof serviceLogger.LogManager>;

export const isFunction: (value: unknown) => boolean = utilDataTypeExports.isFunction;
export const isObject: (value: unknown) => boolean = utilDataTypeExports.isObject;
export const isString: (value: unknown) => boolean = utilDataTypeExports.isString;
