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

interface VWOProviderProps {
  client?: any;
  config?: any;
  userContext?: any;
  children: ReactNode;
}

/**
 * VWOProvider component to provide VWO client and configuration context to child components.
 *
 * @param {Object} props - The properties for the VWOProvider component.
 * @param {Object} props.client - The VWO client instance.
 * @param {Object} props.config - Configuration settings for the VWO client.
 * @param {Object} props.userContext - Initial user context for the VWO client.
 * @param {React.ReactNode} props.children - Child components that will have access to the VWO context.
 * @returns {JSX.Element} The provider component wrapping its children with VWO context.
 */
export const VWOProvider: React.FC<VWOProviderProps> = ({ client, config, userContext, children }) => {
  const [vwoClient, setVwoClient] = useState<any>(client || null);
  const [context, setContext] = useState<any>(userContext || null);
  const vwoClientRef = useRef<any>(vwoClient); // Store the client reference without triggering re-renders
  const isMounted = useRef(true); // Prevent updates after unmount

  const logger = getLogger();

  // Initialize logger globally before using it
  useEffect(() => {
    if (config?.logger) {
      initLogger(config);
    }
  }, [config]);

  // Initialize the VWO SDK instance only once when the component mounts or if config is updated
  useEffect(() => {
    // If neither vwoClient nor config is provided, log the error
    if (!vwoClient && !config) {
      logger.error("VWOProvider Error: Either `client` or `config` must be provided.");
      return;
    }

    const initializeVWO = async () => {
      try {
        if (!vwoClient && config) {
          // Initialize the VWO SDK instance if vwoClient is not already initialized
          const instance = await init(config);
          if (isMounted.current) {
            setVwoClient(instance);
            vwoClientRef.current = instance;
          }
        }
      } catch (error) {
        logger.error(`VWO-SDK Initialization failed: ${error}`);
      }
    };

    // Only initialize once
    if (!vwoClient && config) {
      initializeVWO();
    }

    return () => {
      isMounted.current = false;
      if (vwoClientRef.current && vwoClientRef.current.destroy) {
        vwoClientRef.current.destroy();
      }
    };
  }, [config, vwoClient]); // Re-run only when config or vwoClient changes

  return (
    <VWOContext.Provider value={{ vwoClient, userContext: context, setUserContext: setContext }}>
      {children}
    </VWOContext.Provider>
  );
};
