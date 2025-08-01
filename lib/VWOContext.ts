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

import { createContext, useContext } from 'react';
import { getLogger } from './services/LoggerService';
import { IVWOClient, IVWOContextModel } from 'vwo-fme-node-sdk';
import { LogMessageEnum } from './enum/LogMessageEnum';
import { buildMessage, logHookError } from './utils/LogMessageUtil';
import { HookEnum } from './enum/HookEnum';
interface VWOContextType {
  vwoClient: IVWOClient | null;
  userContext?: IVWOContextModel | null;
  setUserContext?: (context: IVWOContextModel) => void;
  isReady?: boolean;
}

export const VWOContext = createContext<VWOContextType>({
  vwoClient: null,
  userContext: null,
  setUserContext: undefined,
  isReady: false,
});

export const useVWOContext = (): VWOContextType | null => {
  let logger;

  try {
    logger = getLogger();
    // Fetch the context
    const context = useContext(VWOContext);

    // If the context is not found, throw an error
    if (!context) {
      logger.error(buildMessage(LogMessageEnum.INVALID_HOOK_USAGE, { hookName: HookEnum.VWO_CONTEXT }));
      return null;
    }
    return context;
  } catch (error) {
    logHookError(logger, { error, hookName: HookEnum.VWO_CONTEXT }, LogMessageEnum.HOOK_ERROR);
    return null;
  }
};
