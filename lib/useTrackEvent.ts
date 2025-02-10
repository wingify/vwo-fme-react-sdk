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
import { isObject, isString } from './utils/DataTypeUtil';

/**
 * Hook to track an event
 * @param eventName - The name of the event to track
 * @param eventProperties - The properties of the event to track (optional)
 */
export const useTrackEvent = (eventName: string, eventProperties: Record<string, string> = {}) => {
  const logger = getLogger();
  try {
    if (!eventName && !isString(eventName)) {
      logger.error('Event name is required for useTrackEvent hook and it should be a string');
      return;
    }

    // Fetch the vwoClient and userContext from the context
    const { vwoClient, userContext } = useVWOContext();

    if (!vwoClient) {
      logger.error('VWO Client is missing in useTrackEvent hook. Ensure VWOProvider is correctly initialized.');
      return {};
    }

    if (!userContext || !isObject(userContext)) {
      logger.error('Invalid user context in useTrackEvent hook. Ensure a valid userContext is provided.');
      return {};
    }

    // Track the event
    vwoClient.trackEvent(eventName, userContext, eventProperties);
  } catch (error) {
    logger.error(`Error tracking event: ${error}`);
  }
};
