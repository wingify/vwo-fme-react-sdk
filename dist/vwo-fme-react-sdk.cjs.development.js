'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var vwoFmeNodeSdk = require('vwo-fme-node-sdk');

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
    console[level](message); // Use console's logging function dynamically based on the level
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
   * @param {Record<any, any>} transport - The transport object to add.
   */
  addTransport(transport) {
    this.transportManager.addTransport(transport);
  }
  /**
   * Adds multiple transports to the LogManager.
   * @param {Array<Record<any, any>>} transports - The list of transport objects to add.
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
    logger = new LogManager(config.logger || {});
  }
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
/**
 * Context for VWO SDK
 */
const VWOContext = /*#__PURE__*/React.createContext({
  vwoClient: null,
  userContext: {}
});
/**
 * Hook to use the VWO context
 * @returns VWO context
 */
const useVWOContext = () => {
  const logger = getLogger();
  try {
    // Fetch the context
    const context = React.useContext(VWOContext);
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
 * VWOProvider component to provide the VWO SDK instance and context to the app
 * @param client - VWO SDK instance
 * @param config - VWO SDK config (initialization config)
 * @param context - VWO SDK context (userContext)
 * @param children - React children (ReactNode)
 * @returns VWOProvider component
 */
const VWOProvider = ({
  client,
  config,
  context,
  children
}) => {
  const [vwoClient, setVwoClient] = React.useState(client || null);
  const vwoClientRef = React.useRef(vwoClient);
  const isMounted = React.useRef(true);
  // Initialize logger globally before using it
  React.useEffect(() => {
    if (config?.logger) {
      initLogger(config);
    }
  }, [config]);
  const logger = getLogger();
  // Initialize the VWO SDK instance when the component mounts
  React.useEffect(() => {
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
          const instance = await vwoFmeNodeSdk.init(config);
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
  return React__default.createElement(VWOContext.Provider, {
    value: {
      vwoClient,
      userContext: context
    }
  }, children);
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
 * Returns the VWO SDK client instance
 * @returns VWO SDK client instance
 */
const useVWOClient = () => {
  const logger = getLogger();
  try {
    const context = useVWOContext();
    // If the VWO SDK client is not found, throw an error
    if (!context || !context.vwoClient) {
      logger.error('useVWOClient must be used within a VWOProvider !!');
      return null;
    }
    // Return the VWO SDK client
    return context.vwoClient;
  } catch (error) {
    logger.error(`Error in useVWOClient hook: ${error}`);
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
 * Hook to get a feature flag value
 * @param featureKey - The key of the feature flag to get
 * @returns The feature flag value
 */
const useGetFlag = featureKey => {
  // This is the return schema for the flag if the feature key is not found or the flag is not enabled
  const errorReturnSchema = {
    isEnabled: () => false,
    getVariables: () => [],
    getVariable: (_key, defaultValue) => defaultValue
  };
  const logger = getLogger();
  try {
    if (!featureKey) {
      logger.error('Feature key is required for useGetFlag hook');
      return errorReturnSchema;
    }
    const [flag, setFlag] = React.useState(null);
    const {
      vwoClient,
      userContext
    } = useVWOContext();
    if (!vwoClient) {
      logger.error('VWO Client is missing in useGetFlag hook. Ensure VWOProvider is correctly initialized.');
      return errorReturnSchema;
    }
    if (!userContext || !isObject(userContext)) {
      logger.error('Invalid user context in useGetFlag hook. Ensure a valid userContext is provided.');
      return errorReturnSchema;
    }
    // Memoize the userContext to avoid unnecessary re-fetching
    const stableUserContext = React.useMemo(() => userContext, [userContext]);
    // Memoize the getFlag function to avoid re-creation
    const getFlag = React.useMemo(() => {
      return async () => {
        try {
          const result = await vwoClient.getFlag(featureKey, stableUserContext);
          setFlag(result);
        } catch (error) {
          logger.error(`Error fetching feature flag "${featureKey}": ${error}`);
          setFlag({});
        }
      };
    }, [featureKey, vwoClient, stableUserContext]);
    // Runs only when `getFlag` reference changes
    React.useEffect(() => {
      getFlag();
    }, [getFlag]);
    return flag;
  } catch (error) {
    logger.error(`Error getting feature flag: ${error}`);
    return errorReturnSchema;
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
 * Hook to get all variables from a flag
 * @param flag - The flag to get the variables from
 * @returns The variables from the flag
 */
const useGetFlagVariables = flag => {
  const logger = getLogger();
  try {
    if (!flag || !isObject(flag)) {
      logger.error('Flag is required for useGetFlagVariables hook and should be an object');
      return [];
    }
    return flag.getVariables();
  } catch (error) {
    logger.error(`Error getting flag variables: ${error}`);
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
      logger.error('Flag is required for useGetFlagVariable hook and should be an object');
      return [];
    }
    if (!flag || !variableKey) {
      logger.error('Flag and variable key are required for useGetFlagVariable hook');
      return defaultValue;
    }
    return flag.getVariable(variableKey, defaultValue);
  } catch (error) {
    logger.error(`Error getting flag variable: ${error}`);
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
 * Hook to track an event
 * @param eventName - The name of the event to track
 * @param eventProperties - The properties of the event to track (optional)
 */
const useTrackEvent = (eventName, eventProperties = {}) => {
  const logger = getLogger();
  try {
    if (!eventName && !isString(eventName)) {
      logger.error('Event name is required for useTrackEvent hook and it should be a string');
      return;
    }
    // Fetch the vwoClient and userContext from the context
    const {
      vwoClient,
      userContext
    } = useVWOContext();
    if (!vwoClient) {
      logger.error('VWO Client is missing in useTrackEvent hook. Ensure VWOProvider is correctly initialized.');
      return {};
    }
    if (!userContext || !isObject(userContext)) {
      logger.error('Invalid user context in useTrackEvent hook. Ensure a valid userContext is provided.');
      return {};
    }
    // Track the event
    vwoClient.trackEvent(eventName, userContext, eventProperties);
  } catch (error) {
    logger.error(`Error tracking event: ${error}`);
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
 * Hook to set attributes for the user
 * @param attributeMap - The map of attributes to set
 */
const useSetAttribute = attributeMap => {
  const logger = getLogger();
  try {
    if (!attributeMap || !isObject(attributeMap) || Object.keys(attributeMap).length === 0) {
      logger.error('attributeMap(object having key-value pairs of user attributes) is required for useSetAttribute hook');
      return;
    }
    // Fetch the vwoClient and userContext from the context
    const {
      vwoClient,
      userContext
    } = useVWOContext();
    if (!userContext || !isObject(userContext)) {
      logger.error('Invalid user context in useSetAttribute hook. Ensure a valid userContext is provided.');
      return {};
    }
    // Set the attributes
    vwoClient.setAttribute(attributeMap, userContext);
  } catch (error) {
    logger.error(`Error setting attributes: ${error}`);
  }
};

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
//# sourceMappingURL=vwo-fme-react-sdk.cjs.development.js.map
