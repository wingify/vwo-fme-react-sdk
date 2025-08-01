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
import { useTrackEvent } from '../lib/useTrackEvent';
import { getLogger } from '../lib/services/LoggerService';
import { useVWOContext } from '../lib/VWOContext';
import { HookEnum } from '../lib/enum/HookEnum';
import { buildMessage } from '../lib/utils/LogMessageUtil';
import { LogMessageEnum } from '../lib/enum/LogMessageEnum';

jest.mock('../lib/services/LoggerService');
jest.mock('../lib/VWOContext');
jest.mock('vwo-fme-node-sdk', () => ({
  vwoClient: {
    trackEvent: jest.fn(),
  },
}));

const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
};

const mockVWOContext = {
  vwoClient: {
    trackEvent: jest.fn(),
  },
  userContext: { id: '1234' },
  isReady: true,
};

beforeEach(() => {
  jest.clearAllMocks();
  (getLogger as jest.Mock).mockReturnValue(mockLogger);
  (useVWOContext as jest.Mock).mockReturnValue(mockVWOContext);
});

describe('useTrackEvent', () => {
  it('should track event correctly', async () => {
    const { result } = renderHook(() => useTrackEvent());
    const eventProperties = { property1: 'value1' };
    mockVWOContext.vwoClient.trackEvent.mockResolvedValue({ success: true });

    const response = await result.current.trackEvent('eventName', eventProperties);

    expect(mockVWOContext.vwoClient.trackEvent).toHaveBeenCalledWith('eventName', mockVWOContext.userContext, eventProperties);
    expect(response).toEqual({ success: true });
  });

  it('should log error if event name is missing', async () => {
    const { result } = renderHook(() => useTrackEvent());
    const response = await result.current.trackEvent('', {});

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.VWO_TRACK_EVENT_NAME_REQUIRED, { hookName: HookEnum.VWO_TRACK_EVENT }));
    expect(response).toEqual({});
    expect(mockVWOContext.vwoClient.trackEvent).not.toHaveBeenCalled();
  });

  it('should log error if vwoClient is not available', async () => {
    (useVWOContext as jest.Mock).mockReturnValue({ ...mockVWOContext, isReady: false });
    const { result } = renderHook(() => useTrackEvent());

    expect(result.current.isReady).toBe(false);
    const response = await result.current.trackEvent('eventName', {});
    expect(response).toEqual({});
  });

  it('should log error for invalid user context', async () => {
    (useVWOContext as jest.Mock).mockReturnValue({ ...mockVWOContext, userContext: null });
    const { result } = renderHook(() => useTrackEvent());
    const response = await result.current.trackEvent('eventName', {});

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.INVALID_CONTEXT, { hookName: HookEnum.VWO_TRACK_EVENT }));
    expect(response).toEqual({});
    expect(mockVWOContext.vwoClient.trackEvent).not.toHaveBeenCalled();
  });

  it('should handle errors during event tracking', async () => {
    const error = new Error('Test error');
    mockVWOContext.vwoClient.trackEvent.mockRejectedValue(error);

    const { result } = renderHook(() => useTrackEvent());
    const response = await result.current.trackEvent('eventName', {});

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.VWO_TRACK_EVENT_ERROR, { error: 'Test error', eventName: 'eventName' }));
    expect(response).toEqual({});
  });

  it('should handle non-Error objects during event tracking', async () => {
    const error = 'String error';
    mockVWOContext.vwoClient.trackEvent.mockRejectedValue(error);

    const { result } = renderHook(() => useTrackEvent());
    const response = await result.current.trackEvent('eventName', {});

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.VWO_TRACK_EVENT_ERROR, { error: 'String error', eventName: 'eventName' }));
    expect(response).toEqual({});
  });

  it('should handle event tracking without properties', async () => {
    const { result } = renderHook(() => useTrackEvent());
    mockVWOContext.vwoClient.trackEvent.mockResolvedValue({ success: true });

    const response = await result.current.trackEvent('eventName');

    expect(mockVWOContext.vwoClient.trackEvent).toHaveBeenCalledWith('eventName', mockVWOContext.userContext, {});
    expect(response).toEqual({ success: true });
  });
});
