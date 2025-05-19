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

import { isObject } from './utils/DataTypeUtil';
import { getLogger } from './services/LoggerService';
import { Flag } from 'vwo-fme-node-sdk';
import { LogMessageEnum } from './enum/LogMessageEnum';
import { buildMessage } from './utils/LogMessageUtil';

/**
 * Hook to get all variables from a flag
 * @param flag - The flag to get the variables from
 * @returns The variables from the flag
 */
export const useGetFlagVariables = (flag: Flag): Array<Record<string, unknown>> => {
  const logger = getLogger();
  try {
    if (!flag || !isObject(flag)) {
      logger.error(LogMessageEnum.VWO_GET_FLAG_VARIABLES_FLAG_REQUIRED);
      return [];
    }

    return flag.getVariables();
  } catch (error) {
    logger.error(buildMessage(LogMessageEnum.VWO_GET_FLAG_VARIABLES_ERROR, { error }));
    return [];
  }
};

/**
 * Hook to get a flag variable
 * @param flag - The flag to get the variable from
 * @param variableKey - The key of the variable to get
 * @param defaultValue - The default value to return if the variable is not found
 * @returns The value of the variable
 */
export const useGetFlagVariable = <T>(flag: Flag, variableKey: string, defaultValue: T): T => {
  const logger = getLogger();
  try {
    if (!flag || !isObject(flag)) {
      return defaultValue;
    }

    if (!variableKey) {
      logger.error(LogMessageEnum.VWO_GET_FLAG_VARIABLE_REQUIRED);
      return defaultValue;
    }

    return flag.getVariable(variableKey, defaultValue);
  } catch (error) {
    logger.error(buildMessage(LogMessageEnum.VWO_GET_FLAG_VARIABLE_ERROR, { error }));
    return defaultValue;
  }
};
