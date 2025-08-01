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

import { renderHook } from '@testing-library/react-hooks';
import { useSetAttribute } from '../lib/useSetAttribute';
import { getLogger } from '../lib/services/LoggerService';
import { useVWOContext } from '../lib/VWOContext';
import { HookEnum } from '../lib/enum/HookEnum';
import { buildMessage } from '../lib/utils/LogMessageUtil';
import { LogMessageEnum } from '../lib/enum/LogMessageEnum';

jest.mock('../lib/services/LoggerService');
jest.mock('../lib/VWOContext');
jest.mock('vwo-fme-node-sdk', () => ({
  vwoClient: {
    setAttribute: jest.fn(),
  },
}));

const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
};

const mockVWOContext = {
  vwoClient: {
    setAttribute: jest.fn(),
  },
  userContext: { id: '1234' },
  isReady: true,
};

beforeEach(() => {
  jest.clearAllMocks();
  (getLogger as jest.Mock).mockReturnValue(mockLogger);
  (useVWOContext as jest.Mock).mockReturnValue(mockVWOContext);
});

describe('useSetAttribute', () => {
  it('should set user attributes correctly', () => {
    const { result } = renderHook(() => useSetAttribute());
    const mockAttributes = { attribute1: 'value1', attribute2: 123 };

    result.current.setAttribute(mockAttributes);

    expect(mockVWOContext.vwoClient.setAttribute).toHaveBeenCalledWith(mockAttributes, mockVWOContext.userContext);
    expect(mockLogger.info).toHaveBeenCalledWith(`User attributes set: ${JSON.stringify(mockAttributes)}`);
  });

  it('should log error if vwoClient is not available', () => {
    (useVWOContext as jest.Mock).mockReturnValue({ ...mockVWOContext, isReady: false });
    const { result } = renderHook(() => useSetAttribute());
    const mockAttributes = { attribute1: 'value1' };

    result.current.setAttribute(mockAttributes);


    expect(result.current.isReady).toBe(false);
    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.VWO_CLIENT_MISSING, { hookName: HookEnum.VWO_SET_ATTRIBUTE }));
  });

  it('should log error for invalid user context', () => {
    (useVWOContext as jest.Mock).mockReturnValue({ ...mockVWOContext, userContext: null });
    const { result } = renderHook(() => useSetAttribute());
    const mockAttributes = { attribute1: 'value1' };

    result.current.setAttribute(mockAttributes);

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.INVALID_CONTEXT, { hookName: HookEnum.VWO_SET_ATTRIBUTE }));
    expect(mockVWOContext.vwoClient.setAttribute).not.toHaveBeenCalled();
  });

  it('should log error for invalid attribute map', () => {
    const { result } = renderHook(() => useSetAttribute());

    result.current.setAttribute(null as any);

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.VWO_SET_ATTRIBUTE_MAP_REQUIRED, { hookName: HookEnum.VWO_SET_ATTRIBUTE }));
    expect(mockVWOContext.vwoClient.setAttribute).not.toHaveBeenCalled();
  });

  it('should handle errors during attribute setting', () => {
    mockVWOContext.vwoClient.setAttribute.mockImplementation(() => {
      throw 'Test error';
    });

    const { result } = renderHook(() => useSetAttribute());
    const mockAttributes = { attribute1: 'value1' };

    result.current.setAttribute(mockAttributes);

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.VWO_SET_ATTRIBUTE_ERROR, { error: 'Test error' }));
  });
});
