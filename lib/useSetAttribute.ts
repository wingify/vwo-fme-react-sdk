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
import { isObject } from '@wingify/util-data-type';
import { getLogger } from './services/LoggerService';
import { LogMessageEnum } from './enum/LogMessageEnum';
import { buildMessage, logHookError } from './utils/LogMessageUtil';
import { HookEnum } from './enum/HookEnum';
import { IVWOClient } from 'vwo-fme-node-sdk';
import { IVWOContextModel } from 'vwo-fme-node-sdk';

/**
 * Interface for the return type of useSetAttribute hook
 */
export interface ISetAttribute {
  setAttribute: (attributeMap: Record<string, string | number | boolean>) => void;
  isReady: boolean;
}

/**
 * Hook to return a function for setting user attributes.
 * @returns {ISetAttribute} Object containing setAttribute function and isReady boolean
 */
export const useSetAttribute = (): ISetAttribute => {
  let logger;
  let vwoClient: IVWOClient;
  let userContext: IVWOContextModel;
  let isReady: boolean;

  try {
    logger = getLogger();

    // Fetch the vwoClient and userContext from the context
    ({ vwoClient, userContext, isReady } = useVWOContext());
  } catch (error) {
    logHookError(logger, { error }, LogMessageEnum.VWO_SET_ATTRIBUTE_ERROR);
    return { setAttribute: () => {}, isReady: false };
  }
  /**
   * Function to set user attributes dynamically
   * @param attributeMap - The map of attributes to set
   */
  const setAttribute = (attributeMap: Record<string, string | number | boolean>): void => {
    try {
      // Return a no-op function if vwoClient or userContext is not available
      if (!isReady) {
        logger.error(buildMessage(LogMessageEnum.VWO_CLIENT_MISSING, { hookName: HookEnum.VWO_SET_ATTRIBUTE }));
        return;
      }
      if (!userContext || !isObject(userContext) || !userContext.id) {
        logger.error(buildMessage(LogMessageEnum.INVALID_CONTEXT, { hookName: HookEnum.VWO_SET_ATTRIBUTE }));
        return;
      }
      if (!attributeMap || !isObject(attributeMap) || Object.keys(attributeMap).length === 0) {
        logger.error(LogMessageEnum.VWO_SET_ATTRIBUTE_MAP_REQUIRED);
        return;
      }

      vwoClient.setAttribute(attributeMap, userContext); // Set the attributes

      logger.info(
        buildMessage(LogMessageEnum.VWO_SET_ATTRIBUTE_SUCCESS, {
          attributes: JSON.stringify(attributeMap),
        }),
      );
    } catch (error) {
      logHookError(logger, { error }, LogMessageEnum.VWO_SET_ATTRIBUTE_ERROR);
    }
  };

  return { setAttribute, isReady };
};
