
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
import React, { useContext, createContext, useState, useMemo, useEffect, useCallback } from 'react';
import { init } from 'vwo-fme-node-sdk';
export { Flag, LogLevelEnum, StorageConnector, init } from 'vwo-fme-node-sdk';

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
 * Abstract class representing a logger.
 * This class provides the structure for logging mechanisms and should be extended by specific logger implementations.
 */
class Logger {}

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
var LogLevelEnum;
(function (LogLevelEnum) {
  LogLevelEnum["TRACE"] = "trace";
  LogLevelEnum["DEBUG"] = "debug";
  LogLevelEnum["INFO"] = "info";
  LogLevelEnum["WARN"] = "warn";
  LogLevelEnum["ERROR"] = "error";
})(LogLevelEnum || (LogLevelEnum = {}));

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
 * ConsoleTransport class implements the Logger interface to provide logging functionality.
 * It outputs logs to the console based on the log level set in the configuration.
 */
class ConsoleTransport {
  /**
   * Constructor initializes the ConsoleTransport with a configuration object.
   * @param {Record<string, any>} config - Configuration settings for the logger, including 'level'.
   */
  constructor(config = {}) {
    this.config = config; // Store the configuration
    this.level = this.config.level; // Set the logging level from the configuration
  }
  /**
   * Logs a trace message.
   * @param {string} message - The message to log.
   */
  trace(message) {
    this.consoleLog(LogLevelEnum.TRACE, message);
  }
  /**
   * Logs a debug message.
   * @param {string} message - The message to log.
   */
  debug(message) {
    this.consoleLog(LogLevelEnum.DEBUG, message);
  }
  /**
   * Logs an informational message.
   * @param {string} message - The message to log.
   */
  info(message) {
    this.consoleLog(LogLevelEnum.INFO, message);
  }
  /**
   * Logs a warning message.
   * @param {string} message - The message to log.
   */
  warn(message) {
    this.consoleLog(LogLevelEnum.WARN, message);
  }
  /**
   * Logs an error message.
   * @param {string} message - The message to log.
   */
  error(message) {
    this.consoleLog(LogLevelEnum.ERROR, message);
  }
  /**
   * Generic log function that logs messages to the console based on the log level.
   * @param {string} level - The log level under which the message should be logged.
   * @param {string} message - The message to log.
   */
  consoleLog(level, message) {
    console[level](message);
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
/**
 * Implements the ILogMessageBuilder interface to provide a concrete log message builder.
 */
class LogMessageBuilder {
  /**
   * Constructs a new LogMessageBuilder instance.
   * @param {Record<string, any>} loggerConfig - Configuration for the logger.
   * @param {Record<string, any>} transportConfig - Configuration for the transport mechanism.
   */
  constructor(loggerConfig, transportConfig) {
    this.loggerConfig = loggerConfig;
    this.transportConfig = transportConfig;
    // Set the prefix, defaulting to an empty string if not provided.
    this.prefix = this.transportConfig.prefix || this.loggerConfig.prefix || '';
    // Set the date and time format, defaulting to the logger's format if the transport's format is not provided.
    this.dateTimeFormat = this.transportConfig.dateTimeFormat || this.loggerConfig.dateTimeFormat;
  }
  /**
   * Formats a log message combining level, prefix, date/time, and the actual message.
   * @param {string} level - The log level.
   * @param {string} message - The message to log.
   * @returns {string} The formatted log message.
   */
  formatMessage(level, message) {
    return `[${this.getFormattedLevel(level)}]: ${this.getFormattedPrefix(this.prefix)} ${this.getFormattedDateTime()} ${message}`;
  }
  getFormattedPrefix(prefix) {
    return `${prefix}`;
  }
  /**
   * Returns the formatted log level with appropriate coloring based on the log level.
   * @param {string} level - The log level.
   * @returns {string} The formatted log level.
   */
  getFormattedLevel(level) {
    const upperCaseLevel = level.toUpperCase();
    let LogLevelColorInfoEnum;
    LogLevelColorInfoEnum = {
      [LogLevelEnum.TRACE]: upperCaseLevel,
      [LogLevelEnum.DEBUG]: upperCaseLevel,
      [LogLevelEnum.INFO]: upperCaseLevel,
      [LogLevelEnum.WARN]: upperCaseLevel,
      [LogLevelEnum.ERROR]: upperCaseLevel
    };
    return LogLevelColorInfoEnum[level];
  }
  /**
   * Retrieves the current date and time formatted according to the specified format.
   * @returns {string} The formatted date and time.
   */
  getFormattedDateTime() {
    return this.dateTimeFormat();
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
/**
 * Checks if a value is a function.
 * @param val The value to check.
 * @returns True if the value is a function, false otherwise.
 */
function isFunction(val) {
  return Object.prototype.toString.call(val) === '[object Function]';
}
/**
 * Checks if a value is an object (excluding arrays, functions, regex, promises, and dates).
 * @param val The value to check.
 * @returns True if the value is a valid object, false otherwise.
 */
function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}
/**
 * Checks if a value is a string.
 * @param val The value to check.
 * @returns True if the value is a string, false otherwise.
 */
function isString(val) {
  return typeof val === 'string' || Object.prototype.toString.call(val) === '[object String]';
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
var LogLevelNumberEnum;
(function (LogLevelNumberEnum) {
  LogLevelNumberEnum[LogLevelNumberEnum["TRACE"] = 0] = "TRACE";
  LogLevelNumberEnum[LogLevelNumberEnum["DEBUG"] = 1] = "DEBUG";
  LogLevelNumberEnum[LogLevelNumberEnum["INFO"] = 2] = "INFO";
  LogLevelNumberEnum[LogLevelNumberEnum["WARN"] = 3] = "WARN";
  LogLevelNumberEnum[LogLevelNumberEnum["ERROR"] = 4] = "ERROR";
})(LogLevelNumberEnum || (LogLevelNumberEnum = {}));
/**
 * Manages logging transports and delegates logging messages to them based on configuration.
 * Implements the IlogTransport interface.
 */
class LogTransportManager {
  /**
   * Initializes the manager with a configuration object.
   * @param {Record<string, any>} config - Configuration settings for the log manager.
   */
  constructor(config) {
    this.transports = [];
    this.config = config;
  }
  /**
   * Adds a new transport to the manager.
   * @param {Record<string, any>} transport - The transport object to be added.
   */
  addTransport(transport) {
    this.transports.push(transport);
  }
  /**
   * Determines if the log should be processed based on the transport and configuration levels.
   * @param {string} transportLevel - The log level set for the transport.
   * @param {string} configLevel - The log level set in the configuration.
   * @returns {boolean} - Returns true if the log level is appropriate for logging, false otherwise.
   */
  shouldLog(transportLevel, configLevel) {
    // Default to the most specific level available
    // transportLevel = transportLevel || configLevel || this.config.level;
    const targetLevel = LogLevelNumberEnum[transportLevel.toUpperCase()];
    const desiredLevel = LogLevelNumberEnum[(configLevel || this.config.level).toUpperCase()];
    return targetLevel >= desiredLevel;
  }
  /**
   * Logs a message at TRACE level.
   * @param {string} message - The message to log.
   */
  trace(message) {
    this.log(LogLevelEnum.TRACE, message);
  }
  /**
   * Logs a message at DEBUG level.
   * @param {string} message - The message to log.
   */
  debug(message) {
    this.log(LogLevelEnum.DEBUG, message);
  }
  /**
   * Logs a message at INFO level.
   * @param {string} message - The message to log.
   */
  info(message) {
    this.log(LogLevelEnum.INFO, message);
  }
  /**
   * Logs a message at WARN level.
   * @param {string} message - The message to log.
   */
  warn(message) {
    this.log(LogLevelEnum.WARN, message);
  }
  /**
   * Logs a message at ERROR level.
   * @param {string} message - The message to log.
   */
  error(message) {
    this.log(LogLevelEnum.ERROR, message);
  }
  /**
   * Delegates the logging of messages to the appropriate transports.
   * @param {string} level - The level at which to log the message.
   * @param {string} message - The message to log.
   */
  log(level, message) {
    for (let i = 0; i < this.transports.length; i++) {
      const logMessageBuilder = new LogMessageBuilder(this.config, this.transports[i]);
      const formattedMessage = logMessageBuilder.formatMessage(level, message);
      if (this.shouldLog(level, this.transports[i].level)) {
        if (this.transports[i].log && isFunction(this.transports[i].log)) {
          // Use custom log handler if available
          this.transports[i].log(level, message);
        } else {
          // Otherwise, use the default log method
          this.transports[i][level](formattedMessage);
        }
      }
    }
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
/**
 * LogManager class provides logging functionality with support for multiple transports.
 * It is designed as a singleton to ensure a single instance throughout the application.
 */
class LogManager extends Logger {
  /**
   * Constructor for LogManager.
   * @param {Record<string, any>} config - Configuration object for LogManager.
   */
  constructor(config) {
    super();
    this.name = 'VWO Logger'; // Default logger name
    this.requestId = new Date().getTime().toString(); // current timestamp in milliseconds
    this.level = LogLevelEnum.ERROR; // Default logging level
    this.prefix = 'VWO-SDK'; // Default prefix for log messages
    this.config = config;
    if (config.isAlwaysNewInstance || !LogManager.instance) {
      LogManager.instance = this;
      // Initialize configuration with defaults or provided values
      this.config.name = config.name || this.name;
      this.config.requestId = config.requestId || this.requestId;
      this.config.level = config.level || this.level;
      this.config.prefix = config.prefix || this.prefix;
      this.config.dateTimeFormat = config.dateTimeFormat || this.dateTimeFormat;
      this.transportManager = new LogTransportManager(this.config);
      this.handleTransports();
    }
    return LogManager.instance;
  }
  dateTimeFormat() {
    return new Date().toISOString(); // Default date-time format for log messages
  }
  /**
   * Provides access to the singleton instance of LogManager.
   * @returns {LogManager} The singleton instance.
   */
  static get Instance() {
    return LogManager.instance;
  }
  /**
   * Handles the initialization and setup of transports based on configuration.
   */
  handleTransports() {
    this.addTransport(new ConsoleTransport({
      level: this.config.level
    }));
  }
  /**
   * Adds a single transport to the LogManager.
   * @param {Record<string, any>} transport - The transport object to add.
   */
  addTransport(transport) {
    this.transportManager.addTransport(transport);
  }
  /**
   * Adds multiple transports to the LogManager.
   * @param {Array<Record<string, any>>} transports - The list of transport objects to add.
   */
  addTransports(transports) {
    for (let i = 0; i < transports.length; i++) {
      this.addTransport(transports[i]);
    }
  }
  /**
   * Logs a trace message.
   * @param {string} message - The message to log at trace level.
   */
  trace(message) {
    this.transportManager.log(LogLevelEnum.TRACE, message);
  }
  /**
   * Logs a debug message.
   * @param {string} message - The message to log at debug level.
   */
  debug(message) {
    this.transportManager.log(LogLevelEnum.DEBUG, message);
  }
  /**
   * Logs an informational message.
   * @param {string} message - The message to log at info level.
   */
  info(message) {
    this.transportManager.log(LogLevelEnum.INFO, message);
  }
  /**
   * Logs a warning message.
   * @param {string} message - The message to log at warn level.
   */
  warn(message) {
    this.transportManager.log(LogLevelEnum.WARN, message);
  }
  /**
   * Logs an error message.
   * @param {string} message - The message to log at error level.
   */
  error(message) {
    this.transportManager.log(LogLevelEnum.ERROR, message);
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
    logger = new LogManager((config == null ? void 0 : config.logger) || {});
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
    logger = new LogManager({
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
      return isFunction(value) ? value() : value;
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
const VWOContext = /*#__PURE__*/createContext({
  vwoClient: null,
  userContext: null,
  setUserContext: undefined,
  isReady: false
});
const useVWOContext = () => {
  const logger = getLogger();
  try {
    // Fetch the context
    const context = useContext(VWOContext);
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
  const [vwoClient, setVwoClient] = useState(client || null);
  const [context, setContext] = useState(userContext || null);
  const [isReady, setIsReady] = useState(false);
  const logger = initLogger((client == null ? void 0 : client.options) || config);
  const memoizedConfig = useMemo(() => config || (client == null ? void 0 : client.options), []);
  // Initialize the VWO SDK instance only once when the component mounts or if config is updated
  useEffect(() => {
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
          const instance = await init(config);
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
  return React.createElement(VWOContext.Provider, {
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
  const [flag, setFlag] = useState(defaultFlagResult.flag);
  const [isLoading, setIsLoading] = useState(true);
  const logger = getLogger();
  const stableUserContext = useMemo(() => {
    return context || userContext || {};
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
      logger.error(buildMessage(LogMessageEnum.VWO_GET_FLAG_ERROR, {
        featureKey,
        error
      }));
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
    if (!flag || !isObject(flag)) {
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
    if (!flag || !isObject(flag)) {
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
    if (!eventName || !isString(eventName)) {
      logger.error(LogMessageEnum.VWO_TRACK_EVENT_NAME_REQUIRED);
      return Promise.resolve({});
    }
    // Ensure userContext is valid
    if (!userContext || !isObject(userContext) || !userContext.id) {
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
    if (!userContext || !isObject(userContext) || !userContext.id) {
      logger.error(buildMessage(LogMessageEnum.INVALID_CONTEXT, {
        hookName: HookEnum.VWO_SET_ATTRIBUTE
      }));
      return;
    }
    if (!attributeMap || !isObject(attributeMap) || Object.keys(attributeMap).length === 0) {
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

export { VWOProvider, useGetFlag, useGetFlagVariable, useGetFlagVariables, useSetAttribute, useTrackEvent, useVWOClient, useVWOContext };
//# sourceMappingURL=vwo-fme-react-sdk.esm.js.map
