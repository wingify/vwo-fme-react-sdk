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

import '@testing-library/jest-dom';

type LoggerServiceModule = typeof import('../lib/services/LoggerService');

const createTransport = () => {
  const messages: string[] = [];
  return { messages, transport: { log: (_level: string, message: string) => messages.push(message) } };
};

let loggerService: LoggerServiceModule;

beforeEach(() => {
  jest.resetModules();
  loggerService = require('../lib/services/LoggerService');
});

describe('LoggerService', () => {
  it('returns the same default logger on repeated getLogger calls', () => {
    expect(loggerService.getLogger()).toBe(loggerService.getLogger());
  });

  it('applies the logger config even if a default logger was already created', () => {
    const { messages, transport } = createTransport();

    loggerService.getLogger();
    const logger = loggerService.initLogger({ logger: { level: 'debug', transport } });
    logger.error('custom error');

    expect(loggerService.getLogger()).toBe(logger);
    expect(messages).toEqual(['custom error']);
  });

  it('keeps the first applied logger config on later calls', () => {
    const first = createTransport();
    const second = createTransport();

    const logger = loggerService.initLogger({ logger: { level: 'debug', transport: first.transport } });

    expect(loggerService.initLogger({ logger: { level: 'debug', transport: second.transport } })).toBe(logger);
    expect(loggerService.initLogger({})).toBe(logger);

    loggerService.getLogger().error('custom error');
    expect(first.messages).toEqual(['custom error']);
    expect(second.messages).toEqual([]);
  });

  it('keeps the existing logger when no logger config is provided', () => {
    const defaultLogger = loggerService.getLogger();

    expect(loggerService.initLogger({ accountId: '1234' })).toBe(defaultLogger);
  });

  it('does not mutate the logger config passed by the customer', () => {
    const loggerConfig = { level: 'debug' };

    loggerService.initLogger({ logger: loggerConfig });

    expect(loggerConfig).toEqual({ level: 'debug' });
  });

  it('sends errors from hooks rendered inside VWOProvider to the custom logger', () => {
    // Loaded after `jest.resetModules()` so the provider and the renderer share one React instance.
    const React = require('react');
    const ReactDOM = require('react-dom');
    const { act } = require('react-dom/test-utils');
    const { VWOProvider } = require('../lib/VWOProvider');
    const { useGetFlag } = require('../lib/useGetFlag');
    const { messages, transport } = createTransport();
    const client = { options: { logger: { level: 'debug', transport } }, getFlag: jest.fn() };
    const container = document.createElement('div');

    function FlagConsumer() {
      useGetFlag('');
      return null;
    }

    act(() => {
      ReactDOM.render(
        <VWOProvider client={client} userContext={{ id: '1234' }}>
          <FlagConsumer />
        </VWOProvider>,
        container,
      );
    });

    expect(messages).toContain('Feature key is required for useGetFlag hook');
    ReactDOM.unmountComponentAtNode(container);
  });
});
