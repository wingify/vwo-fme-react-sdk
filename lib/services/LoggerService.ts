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

/**
 * logger.ts - Global Logger Singleton
 */
import { LogManager } from '../logger/core/LogManager';

let logger: LogManager | null = null;

/**
 * Initializes the global logger instance.
 * This function should be called inside `VWOProvider` before logging is used anywhere in the application.
 *
 * @param {object} config - The logger configuration object.
 * @param {object} config.logger - Optional logging configuration (e.g., log level, transports).
 * @returns {void} No return value; initializes the logger instance.
 */
export function initLogger(config: any) {
  if (!logger) {
    logger = new LogManager(config.logger || {});
  }
}

/**
 * Retrieves the global logger instance.
 * Ensures that `initLogger` has been called before attempting to use logging.
 *
 * @returns {LogManager} The global logger instance.
 */
export function getLogger(): LogManager {
  if (!logger) {
    logger = new LogManager({ level: 'error' });
  }
  return logger;
}
