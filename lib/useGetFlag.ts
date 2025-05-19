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
import { Flag, IVWOContextModel } from 'vwo-fme-node-sdk';
import { LogMessageEnum } from './enum/LogMessageEnum';
import { buildMessage } from './utils/LogMessageUtil';
import { HookEnum } from './enum/HookEnum';
export interface IFlag {
  flag: Flag;
  isReady: boolean;
}

const createDefaultFlag = () =>
  ({
    isEnabled: () => false,
    getVariables: (): unknown[] => [],
    getVariable: <T = unknown>(key: string, defaultValue?: T) => defaultValue,
  }) as unknown as Flag;

/**
 * Custom hook to retrieve a feature flag using VWO client.
 *
 * @param {string} featureKey - The key of the feature flag to retrieve.
 * @param {Object} [context] - Optional user context to use for fetching the flag.
 * @returns {FlagResult} An object containing the flag and a readiness status.
 */
export const useGetFlag = (featureKey: string, context?: IVWOContextModel): IFlag => {
  const defaultFlagResult: IFlag = {
    flag: createDefaultFlag(),
    isReady: false,
  };
  const { vwoClient, userContext, setUserContext, isReady } = useVWOContext();
  const [flag, setFlag] = useState<Flag>(defaultFlagResult.flag);
  const [isLoading, setIsLoading] = useState(true);

  const logger = getLogger();

  const stableUserContext = useMemo(() => {
    return (context || userContext || {}) as IVWOContextModel;
  }, [JSON.stringify(context || userContext || {})]);

  const getFlag = useCallback(async () => {
    try {
      if (!isReady) {
        logger.error(LogMessageEnum.VWO_NOT_READY_IN_USE_GET_FLAG);
        return;
      }

      const result = await vwoClient.getFlag(featureKey, stableUserContext);
      setFlag(result);

      setUserContext(stableUserContext);
    } catch (error) {
      logger.error(
        buildMessage(LogMessageEnum.VWO_GET_FLAG_ERROR, {
          featureKey,
          error,
        }),
      );
    } finally {
      setIsLoading(false);
    }
  }, [featureKey, stableUserContext, isReady]);

  useEffect(() => {
    if (!featureKey) {
      logger.error(LogMessageEnum.VWO_GET_FLAG_FEATURE_KEY_REQUIRED);
      return;
    }

    if (!isObject(stableUserContext) || !stableUserContext.id) {
      logger.error(buildMessage(LogMessageEnum.INVALID_CONTEXT, { hookName: HookEnum.VWO_GET_FLAG }));
      return;
    }
    // Check if all required dependencies are available
    // stableUserContext && stableUserContext.id - check is added to handle the case where VWOProvider is not initialized
    if (isReady && vwoClient && stableUserContext) {
      getFlag();
    }
  }, [featureKey, JSON.stringify(stableUserContext), isReady]);

  return {
    flag,
    isReady: !isLoading && !!flag,
  };
};
