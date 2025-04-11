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

interface VWOContextType {
  vwoClient: any;
  userContext?: any;
  setUserContext?: (context: any) => void;
}

export const VWOContext = createContext<VWOContextType>({
  vwoClient: null,
  userContext: null,
  setUserContext: undefined, // Default is undefined
});

export const useVWOContext = () => {
  const logger = getLogger();
  try {
    // Fetch the context
    const context = useContext(VWOContext);

    // If the context is not found, throw an error
    if (!context) {
      logger.error('useVWOContext must be used within a VWOProvider');
      return null;
    }
    return context;
  } catch (error) {
    logger.error(`Error in useVWOContext hook: ${error}`);
    return null;
  }
};
