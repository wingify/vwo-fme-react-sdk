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

import { dynamic } from '../types/Common';

type FunctionType = (val: dynamic) => void;

/**
 * Checks if a value is a function.
 * @param val The value to check.
 * @returns True if the value is a function, false otherwise.
 */
export function isFunction(val: dynamic): val is FunctionType {
  return Object.prototype.toString.call(val) === '[object Function]';
}

/**
 * Checks if a value is an object (excluding arrays, functions, regex, promises, and dates).
 * @param val The value to check.
 * @returns True if the value is a valid object, false otherwise.
 */
export function isObject<T>(
  val: T,
): val is Record<any, dynamic> & Exclude<T, Array<dynamic> | FunctionType | RegExp | Promise<dynamic> | Date> {
  return Object.prototype.toString.call(val) === '[object Object]';
}

/**
 * Checks if a value is a string.
 * @param val The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export function isString(val: dynamic): val is string {
  return typeof val === 'string' || Object.prototype.toString.call(val) === '[object String]';
}
