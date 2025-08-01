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

import React, { useEffect, useState, ReactNode, useMemo } from 'react';
import { init, IVWOContextModel, IVWOClient, IVWOOptions } from 'vwo-fme-node-sdk';
import { VWOContext } from './VWOContext';
import { initLogger } from './services/LoggerService';
import { LogMessageEnum } from './enum/LogMessageEnum';
import { logHookError } from './utils/LogMessageUtil';

export interface VWOProviderWithClient {
  client: IVWOClient;
  userContext?: IVWOContextModel;
  children: ReactNode;
  fallbackComponent?: ReactNode;
}

export interface VWOProviderWithConfig {
  config: IVWOOptions;
  userContext?: IVWOContextModel;
  children: ReactNode;
  fallbackComponent?: ReactNode;
}

export type IVWOProvider = VWOProviderWithClient | VWOProviderWithConfig;

/**
 * VWOProvider component to provide VWO client and configuration context to child components.
 *
 * @param props - The props for the VWOProvider component.
 * @returns A React element that provides the VWO client and configuration context to child components.
 */
export function VWOProvider(props: IVWOProvider): React.ReactElement {
  const { userContext, children, fallbackComponent } = props;

  const client = 'client' in props ? props.client : null;
  const config = 'config' in props ? props.config : null;

  const [vwoClient, setVwoClient] = useState<IVWOClient | null>(client || null);
  const [context, setContext] = useState<IVWOContextModel | null>(userContext || null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const memoizedConfig = useMemo(() => config || client?.options, []);

  let logger;
  // Initialize the VWO SDK instance only once when the component mounts or if config is updated
  useEffect(() => {
    try {
      logger = initLogger(client?.options || config);

      if(config && vwoClient) {
        logger.warn(LogMessageEnum.VWO_PROVIDER_CLIENT_CONFIG_WARNING);
      }
      if (vwoClient) {
        setIsReady(true);
        return;
      } else if (!config) {
        logger.error(LogMessageEnum.VWO_PROVIDER_CONFIG_REQUIRED);
        return;
      }

      const initializeVWO = async () => {
        if (!vwoClient && config) {
          // Initialize the VWO SDK instance if vwoClient is not already initialized
          const instance = await init(config);
          setVwoClient(instance);
          setIsReady(true);
        }
      };

      // Initialized only once
      if (!vwoClient && config) {
        initializeVWO();
      }
    } catch (error) {
      logHookError(logger, error, LogMessageEnum.VWO_SDK_INITIALIZATION_FAILED);
    }
  }, [memoizedConfig]); // Re-run only when config changes

  return (
    <VWOContext.Provider value={{ vwoClient, userContext: context, setUserContext: setContext, isReady }}>
      {fallbackComponent && !isReady ? fallbackComponent : children}
    </VWOContext.Provider>
  );
};
