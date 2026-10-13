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

type WingifyPackagesModule = typeof import('../lib/utils/WingifyPackages');

const loadWingifyPackages = (): WingifyPackagesModule => require('../lib/utils/WingifyPackages');

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.dontMock('@wingify/service-logger');
  jest.dontMock('@wingify/util-data-type');
});

describe('WingifyPackages', () => {
  it('resolves exports when the packages expose named exports (bundlers)', () => {
    const { LogManager, isFunction, isObject, isString } = loadWingifyPackages();

    expect(LogManager).toBe(require('@wingify/service-logger').LogManager);
    expect(isObject({})).toBe(true);
    expect(isObject('a')).toBe(false);
    expect(isString('a')).toBe(true);
    expect(isFunction(() => undefined)).toBe(true);
  });

  it("resolves exports when the packages are only exposed under `default` (Node's ESM loader)", () => {
    const serviceLogger = jest.requireActual('@wingify/service-logger');
    const utilDataType = jest.requireActual('@wingify/util-data-type');
    jest.doMock('@wingify/service-logger', () => ({ __esModule: true, default: serviceLogger }));
    jest.doMock('@wingify/util-data-type', () => ({ __esModule: true, default: utilDataType }));

    const { LogManager, isFunction, isObject, isString } = loadWingifyPackages();

    expect(LogManager).toBe(serviceLogger.LogManager);
    expect(isObject({})).toBe(true);
    expect(isString('a')).toBe(true);
    expect(isFunction(() => undefined)).toBe(true);
  });
});
