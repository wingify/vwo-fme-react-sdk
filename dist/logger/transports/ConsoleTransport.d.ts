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
import { Logger } from '../Logger';
/**
 * ConsoleTransport class implements the Logger interface to provide logging functionality.
 * It outputs logs to the console based on the log level set in the configuration.
 */
export declare class ConsoleTransport implements Logger {
  config: Record<string, any>;
  level: string;
  /**
   * Constructor initializes the ConsoleTransport with a configuration object.
   * @param {Record<string, any>} config - Configuration settings for the logger, including 'level'.
   */
  constructor(config?: Record<string, any>);
  /**
   * Logs a trace message.
   * @param {string} message - The message to log.
   */
  trace(message: string): void;
  /**
   * Logs a debug message.
   * @param {string} message - The message to log.
   */
  debug(message: string): void;
  /**
   * Logs an informational message.
   * @param {string} message - The message to log.
   */
  info(message: string): void;
  /**
   * Logs a warning message.
   * @param {string} message - The message to log.
   */
  warn(message: string): void;
  /**
   * Logs an error message.
   * @param {string} message - The message to log.
   */
  error(message: string): void;
  /**
   * Generic log function that logs messages to the console based on the log level.
   * @param {string} level - The log level under which the message should be logged.
   * @param {string} message - The message to log.
   */
  consoleLog(level: string, message: string): void;
}
