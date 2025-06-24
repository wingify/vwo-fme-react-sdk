
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
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var vwoFmeNodeSdk = require('vwo-fme-node-sdk');
var serviceLogger = require('@wingify/service-logger');
var utilDataType = require('@wingify/util-data-type');

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
let logger = null;
/**
 * Initializes the global logger instance.
 * This function should be called inside `VWOProvider` before logging is used anywhere in the application.
 *
 * @param {object} config - The logger configuration object.
 * @param {object} config.logger - Optional logging configuration (e.g., log level, transports).
 * @returns {void} No return value; initializes the logger instance.
 */
function initLogger(config) {
  if (!logger) {
    logger = new serviceLogger.LogManager((config == null ? void 0 : config.logger) || {});
  }
  return logger;
}
/**
 * Retrieves the global logger instance.
 * Ensures that `initLogger` has been called before attempting to use logging.
 *
 * @returns {LogManager} The global logger instance.
 */
function getLogger() {
  if (!logger) {
    logger = new serviceLogger.LogManager({
      level: 'error'
    });
  }
  return logger;
}

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
var LogMessageEnum;
(function (LogMessageEnum) {
  // common messages
  LogMessageEnum["VWO_CLIENT_MISSING"] = "VWO Client is missing in {hookName} hook. Ensure VWOProvider is correctly initialized.";
  LogMessageEnum["INVALID_CONTEXT"] = "Invalid user context in {hookName} hook. Ensure a valid userContext is provided.";
  LogMessageEnum["HOOK_ERROR"] = "Error in {hookName} hook: {error}";
  LogMessageEnum["INVALID_HOOK_USAGE"] = "{hookName} must be used within a VWOProvider !!";
  // VWO Provider Messages
  LogMessageEnum["VWO_PROVIDER_CLIENT_CONFIG_WARNING"] = "VWOProvider Warning: Both `client` and `config` are provided. The `client` prop will take precedence, and the `config` props will be disregarded.";
  LogMessageEnum["VWO_PROVIDER_CONFIG_REQUIRED"] = "VWOProvider Error: Either `client` or `config` must be provided.";
  LogMessageEnum["VWO_SDK_INITIALIZATION_FAILED"] = "VWO-SDK Initialization failed: {error}";
  // useTrackEvent Messages
  LogMessageEnum["VWO_TRACK_EVENT_NAME_REQUIRED"] = "Event name is required for useTrackEvent hook and it should be a string";
  LogMessageEnum["VWO_TRACK_EVENT_ERROR"] = "Error tracking event - {eventName}: {error}";
  // useSetAttribute Messages
  LogMessageEnum["VWO_SET_ATTRIBUTE_MAP_REQUIRED"] = "attributeMap (object having key-value pairs of user attributes) is required for useSetAttribute hook";
  LogMessageEnum["VWO_SET_ATTRIBUTE_ERROR"] = "Error setting attributes: {error}";
  LogMessageEnum["VWO_SET_ATTRIBUTE_SUCCESS"] = "User attributes set: {attributes}";
  // useGetFlag Messages
  LogMessageEnum["VWO_NOT_READY_IN_USE_GET_FLAG"] = "VWO is not ready in useGetFlag hook";
  LogMessageEnum["VWO_GET_FLAG_FEATURE_KEY_REQUIRED"] = "Feature key is required for useGetFlag hook";
  LogMessageEnum["VWO_GET_FLAG_ERROR"] = "Error fetching feature flag - {featureKey}: {error}";
  // useGetFlagVariable Messages
  LogMessageEnum["VWO_GET_FLAG_VARIABLES_FLAG_REQUIRED"] = "Flag is required for useGetFlagVariables hook and should be an object";
  LogMessageEnum["VWO_GET_FLAG_VARIABLES_ERROR"] = "Error getting flag variables: {error}";
  LogMessageEnum["VWO_GET_FLAG_VARIABLE_REQUIRED"] = "Flag and variable key are required for useGetFlagVariable hook";
  LogMessageEnum["VWO_GET_FLAG_VARIABLE_ERROR"] = "Error getting flag variable: {error}";
})(LogMessageEnum || (LogMessageEnum = {}));

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
const nargs = /\{([0-9a-zA-Z_]+)\}/g;
/**
 * Constructs a message by replacing placeholders in a template with corresponding values from a data object.
 *
 * @param {string} template - The message template containing placeholders in the format `{key}`.
 * @param {Record<string, any>} data - An object containing keys and values used to replace the placeholders in the template.
 * @returns {string} The constructed message with all placeholders replaced by their corresponding values from the data object.
 */
function buildMessage(template, data = {}) {
  try {
    return template.replace(nargs, (match, key, index) => {
      // Check for escaped placeholders
      if (template[index - 1] === '{' && template[index + match.length] === '}') {
        return key;
      }
      // Retrieve the value from the data object
      const value = data[key];
      // If the key does not exist or the value is null/undefined, return an empty string
      if (value === undefined || value === null) {
        return '';
      }
      // If the value is a function, evaluate it
      return utilDataType.isFunction(value) ? value() : value;
    });
  } catch (err) {
    return template; // Return the original template in case of an error
  }
}

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
var HookEnum;
(function (HookEnum) {
  HookEnum["VWO_CLIENT"] = "useVWOClient";
  HookEnum["VWO_CONTEXT"] = "useVWOContext";
  HookEnum["VWO_GET_FLAG"] = "useGetFlag";
  HookEnum["VWO_GET_FLAG_VARIABLE"] = "useGetFlagVariable";
  HookEnum["VWO_GET_FLAG_VARIABLES"] = "useGetFlagVariables";
  HookEnum["VWO_TRACK_EVENT"] = "useTrackEvent";
  HookEnum["VWO_SET_ATTRIBUTE"] = "useSetAttribute";
})(HookEnum || (HookEnum = {}));

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
const VWOContext = /*#__PURE__*/React.createContext({
  vwoClient: null,
  userContext: null,
  setUserContext: undefined,
  isReady: false
});
const useVWOContext = () => {
  const logger = getLogger();
  try {
    // Fetch the context
    const context = React.useContext(VWOContext);
    // If the context is not found, throw an error
    if (!context) {
      logger.error(buildMessage(LogMessageEnum.INVALID_HOOK_USAGE, {
        hookName: HookEnum.VWO_CONTEXT
      }));
      return null;
    }
    return context;
  } catch (error) {
    logger.error(buildMessage(LogMessageEnum.HOOK_ERROR, {
      error,
      hookName: HookEnum.VWO_CONTEXT
    }));
    return null;
  }
};

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
/**
 * VWOProvider component to provide VWO client and configuration context to child components.
 *
 * @param props - The props for the VWOProvider component.
 * @returns A React element that provides the VWO client and configuration context to child components.
 */
function VWOProvider(props) {
  const {
    userContext,
    children,
    fallbackComponent
  } = props;
  const client = 'client' in props ? props.client : null;
  const config = 'config' in props ? props.config : null;
  const [vwoClient, setVwoClient] = React.useState(client || null);
  const [context, setContext] = React.useState(userContext || null);
  const [isReady, setIsReady] = React.useState(false);
  const logger = initLogger((client == null ? void 0 : client.options) || config);
  const memoizedConfig = React.useMemo(() => config || (client == null ? void 0 : client.options), []);
  // Initialize the VWO SDK instance only once when the component mounts or if config is updated
  React.useEffect(() => {
    if (config && vwoClient) {
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
      try {
        if (!vwoClient && config) {
          // Initialize the VWO SDK instance if vwoClient is not already initialized
          const instance = await vwoFmeNodeSdk.init(config);
          setVwoClient(instance);
          setIsReady(true);
        }
      } catch (error) {
        logger.error(buildMessage(LogMessageEnum.VWO_SDK_INITIALIZATION_FAILED, {
          error
        }));
      }
    };
    // Only initialize once
    if (!vwoClient && config) {
      initializeVWO();
    }
  }, [memoizedConfig]); // Re-run only when config changes
  return React__default.createElement(VWOContext.Provider, {
    value: {
      vwoClient,
      userContext: context,
      setUserContext: setContext,
      isReady
    }
  }, fallbackComponent && !isReady ? fallbackComponent : children);
}

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
const defaultVwoClientResult = {
  vwoClient: null,
  isReady: false
};
/**
 * Returns the VWO SDK client instance
 * @returns VWO SDK client instance
 */
const useVWOClient = () => {
  const logger = getLogger();
  try {
    const context = useVWOContext();
    if (!context) {
      logger.error(buildMessage(LogMessageEnum.INVALID_HOOK_USAGE, {
        hookName: HookEnum.VWO_CLIENT
      }));
      return defaultVwoClientResult;
    }
    if (!context.isReady) {
      return defaultVwoClientResult;
    }
    return {
      vwoClient: context.vwoClient,
      isReady: true
    };
  } catch (error) {
    logger.error(buildMessage(LogMessageEnum.HOOK_ERROR, {
      error,
      hookName: HookEnum.VWO_CLIENT
    }));
    return defaultVwoClientResult;
  }
};

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
const createDefaultFlag = () => ({
  isEnabled: () => false,
  getVariables: () => [],
  getVariable: (key, defaultValue) => defaultValue
});
/**
 * Custom hook to retrieve a feature flag using VWO client.
 *
 * @param {string} featureKey - The key of the feature flag to retrieve.
 * @param {Object} [context] - Optional user context to use for fetching the flag.
 * @returns {FlagResult} An object containing the flag and a readiness status.
 */
const useGetFlag = (featureKey, context) => {
  const defaultFlagResult = {
    flag: createDefaultFlag(),
    isReady: false
  };
  const {
    vwoClient,
    userContext,
    setUserContext,
    isReady
  } = useVWOContext();
  const [flag, setFlag] = React.useState(defaultFlagResult.flag);
  const [isLoading, setIsLoading] = React.useState(true);
  const logger = getLogger();
  const stableUserContext = React.useMemo(() => {
    return context || userContext || {};
  }, [JSON.stringify(context || userContext || {})]);
  const getFlag = React.useCallback(async () => {
    try {
      if (!isReady) {
        logger.error(LogMessageEnum.VWO_NOT_READY_IN_USE_GET_FLAG);
        return;
      }
      const result = await vwoClient.getFlag(featureKey, stableUserContext);
      setFlag(result);
      setUserContext(stableUserContext);
    } catch (error) {
      logger.error(buildMessage(LogMessageEnum.VWO_GET_FLAG_ERROR, {
        featureKey,
        error
      }));
    } finally {
      setIsLoading(false);
    }
  }, [featureKey, stableUserContext, isReady]);
  React.useEffect(() => {
    if (!featureKey) {
      logger.error(LogMessageEnum.VWO_GET_FLAG_FEATURE_KEY_REQUIRED);
      return;
    }
    if (!utilDataType.isObject(stableUserContext) || !stableUserContext.id) {
      logger.error(buildMessage(LogMessageEnum.INVALID_CONTEXT, {
        hookName: HookEnum.VWO_GET_FLAG
      }));
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
    isReady: !isLoading && !!flag
  };
};

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
/**
 * Hook to get all variables from a flag
 * @param flag - The flag to get the variables from
 * @returns The variables from the flag
 */
const useGetFlagVariables = flag => {
  const logger = getLogger();
  try {
    if (!flag || !utilDataType.isObject(flag)) {
      logger.error(LogMessageEnum.VWO_GET_FLAG_VARIABLES_FLAG_REQUIRED);
      return [];
    }
    return flag.getVariables();
  } catch (error) {
    logger.error(buildMessage(LogMessageEnum.VWO_GET_FLAG_VARIABLES_ERROR, {
      error
    }));
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
const useGetFlagVariable = (flag, variableKey, defaultValue) => {
  const logger = getLogger();
  try {
    if (!flag || !utilDataType.isObject(flag)) {
      return defaultValue;
    }
    if (!variableKey) {
      logger.error(LogMessageEnum.VWO_GET_FLAG_VARIABLE_REQUIRED);
      return defaultValue;
    }
    return flag.getVariable(variableKey, defaultValue);
  } catch (error) {
    logger.error(buildMessage(LogMessageEnum.VWO_GET_FLAG_VARIABLE_ERROR, {
      error
    }));
    return defaultValue;
  }
};

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
/**
 * Hook to provide the trackEvent function for tracking events.
 * @returns {ITrackEvent} Object containing trackEvent function and isReady boolean
 */
const useTrackEvent = () => {
  const logger = getLogger();
  // Fetch the vwoClient and userContext from the context
  const {
    vwoClient,
    userContext,
    isReady
  } = useVWOContext();
  /**
   * trackEvent function to be returned by the hook
   * @param eventName - The name of the event to track
   * @param eventProperties - The properties of the event (optional)
   */
  const trackEvent = async (eventName, eventProperties = {}) => {
    if (!isReady) {
      logger.error(buildMessage(LogMessageEnum.VWO_CLIENT_MISSING, {
        hookName: HookEnum.VWO_TRACK_EVENT
      }));
      return Promise.resolve({});
    }
    if (!eventName || !utilDataType.isString(eventName)) {
      logger.error(LogMessageEnum.VWO_TRACK_EVENT_NAME_REQUIRED);
      return Promise.resolve({});
    }
    // Ensure userContext is valid
    if (!userContext || !utilDataType.isObject(userContext) || !userContext.id) {
      logger.error(buildMessage(LogMessageEnum.INVALID_CONTEXT, {
        hookName: HookEnum.VWO_TRACK_EVENT
      }));
      return Promise.resolve({});
    }
    try {
      return await vwoClient.trackEvent(eventName, userContext, eventProperties);
    } catch (error) {
      logger.error(buildMessage(LogMessageEnum.VWO_TRACK_EVENT_ERROR, {
        eventName,
        error: error instanceof Error ? error.message : error
      }));
      return Promise.resolve({});
    }
  };
  return {
    trackEvent,
    isReady
  };
};

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
/**
 * Hook to return a function for setting user attributes.
 * @returns {ISetAttribute} Object containing setAttribute function and isReady boolean
 */
const useSetAttribute = () => {
  const logger = getLogger();
  // Fetch the vwoClient and userContext from the context
  const {
    vwoClient,
    userContext,
    isReady
  } = useVWOContext();
  /**
   * Function to set user attributes dynamically
   * @param attributeMap - The map of attributes to set
   */
  const setAttribute = attributeMap => {
    // Return a no-op function if vwoClient or userContext is not available
    if (!isReady) {
      logger.error(buildMessage(LogMessageEnum.VWO_CLIENT_MISSING, {
        hookName: HookEnum.VWO_SET_ATTRIBUTE
      }));
      return;
    }
    if (!userContext || !utilDataType.isObject(userContext) || !userContext.id) {
      logger.error(buildMessage(LogMessageEnum.INVALID_CONTEXT, {
        hookName: HookEnum.VWO_SET_ATTRIBUTE
      }));
      return;
    }
    if (!attributeMap || !utilDataType.isObject(attributeMap) || Object.keys(attributeMap).length === 0) {
      logger.error(LogMessageEnum.VWO_SET_ATTRIBUTE_MAP_REQUIRED);
      return;
    }
    try {
      vwoClient.setAttribute(attributeMap, userContext); // Set the attributes
      logger.info(buildMessage(LogMessageEnum.VWO_SET_ATTRIBUTE_SUCCESS, {
        attributes: JSON.stringify(attributeMap)
      }));
    } catch (error) {
      logger.error(buildMessage(LogMessageEnum.VWO_SET_ATTRIBUTE_ERROR, {
        error
      }));
    }
  };
  return {
    setAttribute,
    isReady
  };
};

Object.defineProperty(exports, 'Flag', {
  enumerable: true,
  get: function () {
    return vwoFmeNodeSdk.Flag;
  }
});
Object.defineProperty(exports, 'LogLevelEnum', {
  enumerable: true,
  get: function () {
    return vwoFmeNodeSdk.LogLevelEnum;
  }
});
Object.defineProperty(exports, 'StorageConnector', {
  enumerable: true,
  get: function () {
    return vwoFmeNodeSdk.StorageConnector;
  }
});
Object.defineProperty(exports, 'init', {
  enumerable: true,
  get: function () {
    return vwoFmeNodeSdk.init;
  }
});
exports.VWOProvider = VWOProvider;
exports.useGetFlag = useGetFlag;
exports.useGetFlagVariable = useGetFlagVariable;
exports.useGetFlagVariables = useGetFlagVariables;
exports.useSetAttribute = useSetAttribute;
exports.useTrackEvent = useTrackEvent;
exports.useVWOClient = useVWOClient;
exports.useVWOContext = useVWOContext;
//# sourceMappingURL=vwo-fme-react-sdk.cjs.development.js.map
