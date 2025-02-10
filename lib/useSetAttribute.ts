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

import { useVWOContext } from './VWOContext';
import { isObject } from './utils/DataTypeUtil';
import { getLogger } from './services/LoggerService';

/**
 * Hook to set attributes for the user
 * @param attributeMap - The map of attributes to set
 */
export const useSetAttribute = (attributeMap: Record<string, string>) => {
  const logger = getLogger();
  try {
    if (!attributeMap || !isObject(attributeMap) || Object.keys(attributeMap).length === 0) {
      logger.error(
        'attributeMap(object having key-value pairs of user attributes) is required for useSetAttribute hook',
      );
      return;
    }

    // Fetch the vwoClient and userContext from the context
    const { vwoClient, userContext } = useVWOContext();

    if (!userContext || !isObject(userContext)) {
      logger.error('Invalid user context in useSetAttribute hook. Ensure a valid userContext is provided.');
      return {};
    }

    // Set the attributes
    vwoClient.setAttribute(attributeMap, userContext);
  } catch (error) {
    logger.error(`Error setting attributes: ${error}`);
  }
};
