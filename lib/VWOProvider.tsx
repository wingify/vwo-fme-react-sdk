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

import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { init } from 'vwo-fme-node-sdk'; 
import { VWOContext } from './VWOContext';
import { initLogger, getLogger } from './services/LoggerService';
import { isObject } from './utils/DataTypeUtil';

/**
 * Props for VWOProvider
 */
interface VWOProviderProps {
  client?: any;
  config?: any;
  context: any;
  children: ReactNode;
}

/**
 * VWOProvider component to provide the VWO SDK instance and context to the app
 * @param client - VWO SDK instance
 * @param config - VWO SDK config (initialization config)
 * @param context - VWO SDK context (userContext)
 * @param children - React children (ReactNode)
 * @returns VWOProvider component
 */
export const VWOProvider = ({ client, config, context, children }: VWOProviderProps) => {
  const [vwoClient, setVwoClient] = useState<any>(client || null);
  const vwoClientRef = useRef<any>(vwoClient);
  const isMounted = useRef(true);

  // Initialize logger globally before using it
  useEffect(() => {
    if (config?.logger) {
      initLogger(config);
    }
  }, [config]);

  const logger = getLogger();

  // Initialize the VWO SDK instance when the component mounts
  useEffect(() => {
    if (!vwoClient && !config) {
      logger.error("VWOProvider Error: Either `client` or `config` must be provided.");
      return;
    }

    if (!context || !isObject(context)) {
      logger.error("VWOProvider Error: `context` is required and must be a valid object.");
      return;
    }

    isMounted.current = true;

    async function initializeVWO() {
      if (!vwoClient && config) {
        try {
          // Initialize the VWO SDK instance
          const instance = await init(config);

          if (isMounted.current) {
            // Update the VWO SDK instance
            setVwoClient(instance);
            // Update the ref with the new instance
            vwoClientRef.current = instance;
          }
        } catch (error) {
          logger.error("VWO-SDK Initialization failed:");
        }
      }
    }

    // Initialize the VWO SDK instance
    initializeVWO();

    // Cleanup the VWO SDK instance when the component unmounts
    return () => {
      isMounted.current = false;
      if (vwoClientRef.current?.destroy) vwoClientRef.current.destroy();
    };
  }, [vwoClient, config]);

  // Provide the VWO SDK instance and context to the app
  return (
    <VWOContext.Provider value={{ vwoClient, userContext: context }}>
      {children}
    </VWOContext.Provider>
  );
}
