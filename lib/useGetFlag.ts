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

import { useState, useEffect, useMemo } from 'react';
import { useVWOContext } from './VWOContext';
import { getLogger } from './services/LoggerService';
import { isObject } from './utils/DataTypeUtil';
import { dynamic } from './types/Common';

/**
 * Hook to get a feature flag value
 * @param featureKey - The key of the feature flag to get
 * @returns The feature flag value
 */
export const useGetFlag = (featureKey: string) => {
  // This is the return schema for the flag if the feature key is not found or the flag is not enabled
  const errorReturnSchema = {
    isEnabled: (): boolean => false,
    getVariables: (): Array<Record<string, dynamic>> => [],
    getVariable: (_key: string, defaultValue: any): dynamic => defaultValue,
  };
  const logger = getLogger();
  try {
    if (!featureKey) {
      logger.error('Feature key is required for useGetFlag hook');
      return errorReturnSchema;
    }

    const [flag, setFlag] = useState<any | null>(null);
    const { vwoClient, userContext } = useVWOContext();

    if (!vwoClient) {
      logger.error('VWO Client is missing in useGetFlag hook. Ensure VWOProvider is correctly initialized.');
      return errorReturnSchema;
    }

    if (!userContext || !isObject(userContext)) {
      logger.error('Invalid user context in useGetFlag hook. Ensure a valid userContext is provided.');
      return errorReturnSchema;
    }

    // Memoize the userContext to avoid unnecessary re-fetching
    const stableUserContext = useMemo(() => userContext, [userContext]);

    // Memoize the getFlag function to avoid re-creation
    const getFlag = useMemo(() => {
      return async () => {
        try {
          const result = await vwoClient.getFlag(featureKey, stableUserContext);
          setFlag(result);
        } catch (error) {
          logger.error(`Error fetching feature flag "${featureKey}": ${error}`);
          setFlag({});
        }
      };
    }, [featureKey, vwoClient, stableUserContext]);

    // Runs only when `getFlag` reference changes
    useEffect(() => {
      getFlag();
    }, [getFlag]);

    return flag;
  } catch (error) {
    logger.error(`Error getting feature flag: ${error}`);
    return errorReturnSchema;
  }
};
