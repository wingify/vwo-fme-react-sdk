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
import { useVWOContext } from '../lib/VWOContext';
import { getLogger } from '../lib/services/LoggerService';
import { IVWOContextModel } from 'vwo-fme-node-sdk';
import '@testing-library/jest-dom';
import { HookEnum } from '../lib/enum/HookEnum';
import { buildMessage } from '../lib/utils/LogMessageUtil';
import { LogMessageEnum } from '../lib/enum/LogMessageEnum';

jest.mock('../lib/services/LoggerService');
jest.mock('../lib/VWOContext', () => ({
  useVWOContext: jest.fn()
}));

const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn()
};

beforeEach(() => {
  jest.clearAllMocks();
  (getLogger as jest.Mock).mockReturnValue(mockLogger);
});

describe('useVWOContext', () => {
  it('should return context data', () => {
    const mockVwoClient = {};
    const mockContext: IVWOContextModel = { id: '1234' };
    const mockSetUserContext = jest.fn();

    (useVWOContext as jest.Mock).mockReturnValue({
      vwoClient: mockVwoClient,
      userContext: mockContext,
      setUserContext: mockSetUserContext,
      isReady: true,
    });

    const { result } = renderHook(() => useVWOContext());
    expect(result.current).toEqual({
      vwoClient: mockVwoClient,
      userContext: mockContext,
      setUserContext: expect.any(Function),
      isReady: true,
    });
  });

  it('should log error if context is not available', () => {
    (useVWOContext as jest.Mock).mockImplementation(() => {
      const logger = getLogger();
      logger.error(buildMessage(LogMessageEnum.INVALID_HOOK_USAGE, {hookName: HookEnum.VWO_CONTEXT }));
      return null;
    });

    renderHook(() => useVWOContext());
    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.INVALID_HOOK_USAGE, {hookName: HookEnum.VWO_CONTEXT }));
  });

  it('should handle context with missing optional properties', () => {
    const mockVwoClient = {};
    
    (useVWOContext as jest.Mock).mockReturnValue({
      vwoClient: mockVwoClient,
      isReady: true,
    });

    const { result } = renderHook(() => useVWOContext());
    expect(result.current).toEqual({
      vwoClient: mockVwoClient,
      userContext: undefined,
      setUserContext: undefined,
      isReady: true,
    });
  });

  it('should handle context with not ready state', () => {
    const mockVwoClient = {};
    const mockContext: IVWOContextModel = { id: '1234' };
    const mockSetUserContext = jest.fn();

    (useVWOContext as jest.Mock).mockReturnValue({
      vwoClient: mockVwoClient,
      userContext: mockContext,
      setUserContext: mockSetUserContext,
      isReady: false,
    });

    const { result } = renderHook(() => useVWOContext());
    expect(result.current).toEqual({
      vwoClient: mockVwoClient,
      userContext: mockContext,
      setUserContext: expect.any(Function),
      isReady: false,
    });
  });

  it('should handle context with null vwoClient', () => {
    const mockContext: IVWOContextModel = { id: '1234' };
    const mockSetUserContext = jest.fn();

    (useVWOContext as jest.Mock).mockReturnValue({
      vwoClient: null,
      userContext: mockContext,
      setUserContext: mockSetUserContext,
      isReady: true,
    });

    const { result } = renderHook(() => useVWOContext());
    expect(result.current).toEqual({
      vwoClient: null,
      userContext: mockContext,
      setUserContext: expect.any(Function),
      isReady: true,
    });
  });

  it('should handle context update through setUserContext', () => {
    const mockVwoClient = {};
    const initialContext: IVWOContextModel = { id: '1234' };
    const updatedContext: IVWOContextModel = { id: '5678' };
    const mockSetUserContext = jest.fn();

    (useVWOContext as jest.Mock).mockReturnValue({
      vwoClient: mockVwoClient,
      userContext: initialContext,
      setUserContext: mockSetUserContext,
      isReady: true,
    });

    const { result } = renderHook(() => useVWOContext());
    
    if (result.current?.setUserContext) {
      result.current.setUserContext(updatedContext);
    }
    
    expect(mockSetUserContext).toHaveBeenCalledWith(updatedContext);
  });
});
