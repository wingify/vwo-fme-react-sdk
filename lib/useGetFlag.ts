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

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useVWOContext } from './VWOContext';
import { getLogger } from './services/LoggerService';
import { isObject } from './utils/DataTypeUtil';

/**
 * Custom hook to retrieve a feature flag using VWO client.
 *
 * @param {string} featureKey - The key of the feature flag to retrieve.
 * @param {Object} [context] - Optional user context to use for fetching the flag.
 * @returns {Object} An object containing the flag and a readiness status.
 */
export const useGetFlag = (featureKey: string, context?: any) => {
  // Define the error return schema for the hook
  const errorReturnSchema = {
    flag: {
      isEnabled: (): boolean => false,
      getVariables: (): Array<Record<string, any>> => [],
      getVariable: (_key: string, defaultValue: any): any => defaultValue,
    },
    isReady: (): boolean => false,
  };

  // Destructure vwoClient, setUserContext, and userContext from VWOContext
  const { vwoClient, setUserContext, userContext } = useVWOContext();

  // State to store the flag and loading status
  const [flag, setFlag] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get the logger instance
  const logger = getLogger();

  // Memoize the user context to prevent unnecessary re-renders
  const stableUserContext = useMemo(() => {
    return context || userContext || {};
  }, [JSON.stringify(context || userContext || {})]); // Only recreate if userContext actually changes

  // Define the getFlag function to fetch the feature flag
  const getFlag = useCallback(async () => {
    // Check if featureKey is provided
    if (!featureKey) {
      logger.error('Feature key is required for useGetFlag hook');
      return errorReturnSchema;
    }

    // Check if the user context is a valid object
    if (!isObject(stableUserContext)) {
      logger.error('Invalid user context in useGetFlag hook');
      return errorReturnSchema;
    }

    // Try to fetch the feature flag and handle errors
    try {
      setIsLoading(true);
      const result = await vwoClient.getFlag(featureKey, stableUserContext);
      setFlag(result);

      // Set the user context in the context to ensure it's available for other hooks
      setUserContext(stableUserContext);
    } catch (error) {
      logger.error(`Error fetching feature flag "${featureKey}": ${error}`);
      setFlag(null);
    } finally {
      setIsLoading(false);
    }
  }, [featureKey, stableUserContext, vwoClient]);

  // Ensure vwoClient is ready
  if (!vwoClient) {
    logger.error('VWO Client is missing in useGetFlag hook. Ensure VWOProvider is correctly initialized.');
    return errorReturnSchema;
  }

  // Run effect when dependencies change to fetch the flag
  useEffect(() => {
    if (featureKey && vwoClient && stableUserContext) {
      getFlag();
    }
  }, [featureKey, stableUserContext, vwoClient]);

  // Return the flag and readiness status
  return {
    flag,
    isReady: (): boolean => !isLoading && !!flag,
  };
};
