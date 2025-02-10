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

/**
 * Returns the VWO SDK client instance
 * @returns VWO SDK client instance
 */
export const useVWOClient = () => {
  const logger = getLogger();
  try {
    const context = useVWOContext();

    // If the VWO SDK client is not found, throw an error
    if (!context || !context.vwoClient) {
      logger.error('useVWOClient must be used within a VWOProvider !!');
      return null;
    }

    // Return the VWO SDK client
    return context.vwoClient;
  } catch (error) {
    logger.error(`Error in useVWOClient hook: ${error}`);
    return null;
  }
};
