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
 * Constructs a message by replacing placeholders in a template with corresponding values from a data object.
 *
 * @param {string} template - The message template containing placeholders in the format `{key}`.
 * @param {Record<string, any>} data - An object containing keys and values used to replace the placeholders in the template.
 * @returns {string} The constructed message with all placeholders replaced by their corresponding values from the data object.
 */
export declare function buildMessage(template: string, data?: Record<string, any>): string;
/**
 * Logs an error message using the provided logger after building the message with template data.
 *
 * @param {any} logger - The logger instance used to log the error message.
 * @param {any} obj - An object containing data used to replace placeholders in the message template.
 * @param {string} message - The message template containing placeholders to be replaced with values from the obj parameter.
 */
export declare function logHookError(logger: any, obj: Record<string, any>, message: string): void;
