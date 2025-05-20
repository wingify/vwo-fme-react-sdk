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

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { useGetFlag } from '../lib/useGetFlag';
import { getLogger } from '../lib/services/LoggerService';
import { VWOProvider } from '../lib/VWOProvider';
import { IVWOClient, IVWOContextModel, Flag } from 'vwo-fme-node-sdk';
import { buildMessage } from '../lib/utils/LogMessageUtil';
import { LogMessageEnum } from '../lib/enum/LogMessageEnum';
import { HookEnum } from '../lib/enum/HookEnum';
jest.mock('../lib/services/LoggerService');

const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
};

// Partial mock of IVWOClient with getFlag mocked
const mockVwoClient: Partial<IVWOClient> = {
  getFlag: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (getLogger as jest.Mock).mockReturnValue(mockLogger);
});

describe('useGetFlag hook', () => {
  const mockContext: IVWOContextModel = { id: 'user-1234' };
  const mockFlag: Partial<Flag> = {
    isEnabled: jest.fn().mockReturnValue(true),
    getVariables: jest.fn().mockReturnValue([]),
    getVariable: jest.fn().mockReturnValue('default'),
  };

  it('fetches flag and returns expected state', async () => {
    (mockVwoClient.getFlag as jest.Mock).mockResolvedValueOnce(mockFlag);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <VWOProvider client={mockVwoClient as IVWOClient} userContext={mockContext}>
        {children}
      </VWOProvider>
    );

    const { result } = renderHook(() => useGetFlag('feature-key'), { wrapper });

    await waitFor(() => {
      expect(mockVwoClient.getFlag).toHaveBeenCalledWith('feature-key', mockContext);
      expect(result.current.flag.isEnabled()).toBe(true);
      expect(result.current.isReady).toBe(true);
    });
  });

  it('logs error when featureKey is missing', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <VWOProvider client={mockVwoClient as IVWOClient} userContext={mockContext}>
        {children}
      </VWOProvider>
    );

    renderHook(() => useGetFlag(''), { wrapper });

    expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.VWO_GET_FLAG_FEATURE_KEY_REQUIRED, { hookName: HookEnum.VWO_GET_FLAG }));
  });

  it('logs error and returns default flag when user context is invalid', async () => {
    (mockVwoClient.getFlag as jest.Mock).mockResolvedValueOnce(mockFlag);

    const invalidContext = null; // or undefined or invalid object

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <VWOProvider client={mockVwoClient as IVWOClient} userContext={invalidContext as any}>
        {children}
      </VWOProvider>
    );

    const { result } = renderHook(() => useGetFlag('feature-key'), { wrapper });

    await waitFor(() => {
      expect(mockLogger.error).toHaveBeenCalledWith(buildMessage(LogMessageEnum.INVALID_CONTEXT, { hookName: HookEnum.VWO_GET_FLAG }));
      expect(result.current.flag.isEnabled()).toBe(false); // default flag returns false
      expect(result.current.isReady).toBe(false);
    });
  });
});
