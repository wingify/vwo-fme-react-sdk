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

import { IVWOClient } from 'vwo-fme-node-sdk';
import { getLogger } from './services/LoggerService';
import { useVWOContext } from './VWOContext';
import { LogMessageEnum } from './enum/LogMessageEnum';
import { buildMessage, logHookError } from './utils/LogMessageUtil';
import { HookEnum } from './enum/HookEnum';
const defaultVwoClientResult: VWOClientResult = {
  vwoClient: null,
  isReady: false,
};

export interface VWOClientResult {
  vwoClient: IVWOClient | null;
  isReady: boolean;
}

/**
 * Returns the VWO SDK client instance
 * @returns VWO SDK client instance
 */
export const useVWOClient = (): VWOClientResult => {
  let logger;

  try {
    logger = getLogger();

    const context = useVWOContext();

    if (!context) {
      logger.error(buildMessage(LogMessageEnum.INVALID_HOOK_USAGE, { hookName: HookEnum.VWO_CLIENT }));
      return defaultVwoClientResult;
    }

    if (!context.isReady) {
      return defaultVwoClientResult;
    }

    return {
      vwoClient: context.vwoClient,
      isReady: true,
    };
  } catch (error) {
    logHookError(logger, { error, hookName: HookEnum.VWO_CLIENT }, LogMessageEnum.HOOK_ERROR);
    return defaultVwoClientResult;
  }
};
