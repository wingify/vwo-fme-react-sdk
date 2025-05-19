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

import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import { VWOProvider } from '../lib/VWOProvider'; // Update with correct import
import { IVWOClient, IVWOContextModel, Flag } from 'vwo-fme-node-sdk';
import { dummySettings } from './data/dummySettings'; // Assume the dummySettings is defined
import { getLogger } from '../lib/services/LoggerService';
import { HookEnum } from '../lib/enum/HookEnum';
import { buildMessage } from '../lib/utils/LogMessageUtil';
import { LogMessageEnum } from '../lib/enum/LogMessageEnum';

jest.mock('../lib/services/LoggerService', () => ({
    getLogger: jest.fn(),
    initLogger: jest.fn()
}));

const mockLogger = {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
};

beforeEach(() => {
    jest.clearAllMocks();
    (getLogger as jest.Mock).mockReturnValue(mockLogger);
    (require('../lib/services/LoggerService').initLogger as jest.Mock).mockReturnValue(mockLogger);
});

describe('VWOProvider', () => {
    it('should provide context to children when client is passed', async () => {
        // Mock implementation of IVWOClient
        const mockVwoClient: IVWOClient = {
            settings: dummySettings as any,
            originalSettings: {},
            getFlag: jest.fn().mockResolvedValue({
                isEnabled: jest.fn().mockReturnValue(true),
                getVariables: jest.fn().mockReturnValue([]),
                getVariable: jest.fn().mockReturnValue(null),
            }),
            trackEvent: jest.fn().mockResolvedValue({ success: true }),
            setAttribute: jest.fn().mockResolvedValue(void 0),
            updateSettings: jest.fn().mockResolvedValue(void 0),
            flushEvents: jest.fn().mockResolvedValue({ status: 'success', events: [] }),
        };

        const mockContext: IVWOContextModel = { id: '1234'};

        render(
            <VWOProvider userContext={mockContext} config={{ accountId: '1234', sdkKey: 'API_KEY', logger: { level: 'DEBUG' } }}>
                <div data-testid="test-child" />
            </VWOProvider>
        );

        // Check that the child component is rendered
        await waitFor(() => screen.getByTestId('test-child'));
    });

    it('should provide context to children when only client is passed and not config', async () => {
        // Mock implementation of IVWOClient
        const mockVwoClient: IVWOClient = {
            settings: dummySettings as any,
            originalSettings: {},
            getFlag: jest.fn().mockResolvedValue({
                isEnabled: jest.fn().mockReturnValue(true),
                getVariables: jest.fn().mockReturnValue([]),
                getVariable: jest.fn().mockReturnValue(null),
            }),
            trackEvent: jest.fn().mockResolvedValue({ success: true }),
            setAttribute: jest.fn().mockResolvedValue(void 0),
            updateSettings: jest.fn().mockResolvedValue(void 0),
            flushEvents: jest.fn().mockResolvedValue({ status: 'success', events: [] }),
        };

        const mockContext: IVWOContextModel = { id: '1234'};

        render(
            <VWOProvider client={mockVwoClient} userContext={mockContext}>
                <div data-testid="test-child" />
            </VWOProvider>
        );

        // Check that the child component is rendered
        await waitFor(() => screen.getByTestId('test-child'));
    });
    

    it('should log a warning when both client and configuration props are provided', async () => {

        render(
            <VWOProvider client={dummySettings as any} config={{ accountId: '1234', sdkKey: 'API_KEY' }} userContext={{ id: '1234' }}>
                <div data-testid="test-child" />
            </VWOProvider>
        );
        await waitFor(() => {
            expect(mockLogger.warn).toHaveBeenCalledWith(LogMessageEnum.VWO_PROVIDER_CLIENT_CONFIG_WARNING);
        });
    });
});
