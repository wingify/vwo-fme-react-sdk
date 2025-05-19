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

import { renderHook } from '@testing-library/react';
import { useVWOClient } from '../lib/useVWOClient';
import { getLogger } from '../lib/services/LoggerService';
import { useVWOContext } from '../lib/VWOContext';
import React from 'react';
import { HookEnum } from '../lib/enum/HookEnum';
import { buildMessage } from '../lib/utils/LogMessageUtil';
import { LogMessageEnum } from '../lib/enum/LogMessageEnum';

jest.mock('../lib/services/LoggerService');
jest.mock('../lib/VWOContext');

const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
};

const mockVwoClient = { 
  getFlag: jest.fn(),
  track: jest.fn(),
  getVariable: jest.fn()
};

describe('useVWOClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getLogger as jest.Mock).mockReturnValue(mockLogger);
  });

  it('should return vwoClient if ready', () => {
    (useVWOContext as jest.Mock).mockReturnValue({
      vwoClient: mockVwoClient,
      isReady: true
    });

    const { result } = renderHook(() => useVWOClient());

    expect(result.current.vwoClient).toBe(mockVwoClient);
    expect(result.current.isReady).toBe(true);
  });

  it('should log error if VWOProvider is not used correctly', () => {
    (useVWOContext as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useVWOClient());

    expect(result.current.vwoClient).toBeNull();
    expect(result.current.isReady).toBe(false);
    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.INVALID_HOOK_USAGE, {hookName: HookEnum.VWO_CLIENT }));
  });

  it('should return default values when context is not ready', () => {
    (useVWOContext as jest.Mock).mockReturnValue({
      vwoClient: mockVwoClient,
      isReady: false
    });

    const { result } = renderHook(() => useVWOClient());

    expect(result.current.vwoClient).toBeNull();
    expect(result.current.isReady).toBe(false);
  });

  it('should handle errors gracefully', () => {
    (useVWOContext as jest.Mock).mockImplementation(() => {
      throw 'Test error';
    });

    const { result } = renderHook(() => useVWOClient());

    expect(result.current.vwoClient).toBeNull();
    expect(result.current.isReady).toBe(false);
    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.HOOK_ERROR, {error: 'Test error', hookName: HookEnum.VWO_CLIENT }));
  });

  it('should maintain consistent return type across all scenarios', () => {
    const scenarios = [
      { context: null, expected: { vwoClient: null, isReady: false } },
      { context: { vwoClient: mockVwoClient, isReady: false }, expected: { vwoClient: null, isReady: false } },
      { context: { vwoClient: mockVwoClient, isReady: true }, expected: { vwoClient: mockVwoClient, isReady: true } }
    ];

    scenarios.forEach(({ context, expected }) => {
      (useVWOContext as jest.Mock).mockReturnValue(context);
      const { result } = renderHook(() => useVWOClient());
      expect(result.current).toEqual(expected);
    });
  });
});
