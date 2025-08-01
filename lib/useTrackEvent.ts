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

import { getLogger } from './services/LoggerService';
import { useVWOContext } from './VWOContext';
import { isObject, isString } from '@wingify/util-data-type';
import { LogMessageEnum } from './enum/LogMessageEnum';
import { buildMessage, logHookError } from './utils/LogMessageUtil';
import { HookEnum } from './enum/HookEnum';
import { IVWOClient, IVWOContextModel } from 'vwo-fme-node-sdk';
/**
 * Interface for the return type of useTrackEvent hook
 */
export interface ITrackEvent {
  trackEvent: (
    eventName: string,
    eventProperties?: Record<string, string | number | boolean>,
  ) => Promise<Record<string, boolean>>;
  isReady: boolean;
}

/**
 * Hook to provide the trackEvent function for tracking events.
 * @returns {ITrackEvent} Object containing trackEvent function and isReady boolean
 */
export const useTrackEvent = (): ITrackEvent => {
  let logger;
  let vwoClient: IVWOClient;
  let userContext: IVWOContextModel;
  let isReady: boolean;

  try {
    logger = getLogger();

    // Fetch the vwoClient and userContext from the context
    ({ vwoClient, userContext, isReady } = useVWOContext());
  } catch (error) {
    logHookError(logger, { error }, LogMessageEnum.VWO_TRACK_EVENT_ERROR);
    return { trackEvent: () => Promise.resolve({}), isReady: false };
  }
  /**
   * trackEvent function to be returned by the hook
   * @param eventName - The name of the event to track
   * @param eventProperties - The properties of the event (optional)
   */
  const trackEvent = async (
    eventName: string,
    eventProperties: Record<string, string | number | boolean> = {},
  ): Promise<Record<string, boolean>> => {
    try {
      if (!isReady) {
        logger.error(buildMessage(LogMessageEnum.VWO_CLIENT_MISSING, { hookName: HookEnum.VWO_TRACK_EVENT }));
        return Promise.resolve({});
      }
      if (!eventName || !isString(eventName)) {
        logger.error(LogMessageEnum.VWO_TRACK_EVENT_NAME_REQUIRED);
        return Promise.resolve({});
      }

      // Ensure userContext is valid
      if (!userContext || !isObject(userContext) || !userContext.id) {
        logger.error(buildMessage(LogMessageEnum.INVALID_CONTEXT, { hookName: HookEnum.VWO_TRACK_EVENT }));
        return Promise.resolve({});
      }

      return await vwoClient.trackEvent(eventName, userContext, eventProperties);
    } catch (error) {
      logHookError(
        logger,
        { error: error instanceof Error ? error.message : error, eventName },
        LogMessageEnum.VWO_TRACK_EVENT_ERROR,
      );
      return Promise.resolve({});
    }
  };

  return { trackEvent, isReady };
};
