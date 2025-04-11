# VWO Feature Management and Experimentation SDK for React SDK

[![npm version](https://img.shields.io/npm/v/vwo-fme-react-sdk?style=for-the-badge&color=grey&logo=npm)](https://www.npmjs.com/package/vwo-fme-react-sdk)
[![License](https://img.shields.io/github/license/wingify/vwo-fme-react-sdk?style=for-the-badge&color=blue)](http://www.apache.org/licenses/LICENSE-2.0)
![](http://img.badgesize.io/wingify/vwo-fme-react-sdk/master/dist/vwo-fme-react-sdk.cjs.production.min.js?compression=gzip&color=blue)

## Overview

The **VWO Feature Management and Experimentation SDK** (VWO FME React SDK) enables React.js developers to integrate feature flagging and experimentation into their applications. This SDK provides full control over feature rollout, A/B testing, and event tracking, allowing teams to manage features dynamically and gain insights into user behavior.

## Requirements

- **React 16.8+**

## Installation

Install the SDK via [**npm**](https://npmjs.com/package/vwo-fme-react-sdk) or [**yarn**](https://classic.yarnpkg.com/en/package/vwo-fme-react-sdk):

```bash
# via npm
npm install vwo-fme-react-sdk --save

# via yarn
yarn add vwo-fme-react-sdk
```

## Basic Usage Example

```javascript
import React from 'react';
import { VWOProvider } from 'vwo-fme-react-sdk';

const vwoConfig = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

const userContext = {
  id: 'unique_user_id', // Required: Unique identifier for the user
  customVariables: { age: 25, location: 'US' }, // Optional
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', // Optional
  ipAddress: '1.1.1.1', // Optional
};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

Inside your component, use feature flagging and experimentation

```javascript
// Import hooks
import { useGetFlag, useGetFlagVariable } from 'vwo-fme-react-sdk';

const YourComponent = () => {
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key');

  // Or, pass userContext, if not provided at the time of using VWOProvider or you want to use updated user context
  // const { flag, isReady } = useGetFlag('feature_key', userContext);

  if (!isReady()) {
    return <div>Default/Zero state</div>;
  }
  // Check if the flag is enabled
  const isEnabled = flag?.isEnabled();
  if (isEnabled) {
    // Use the flag object returned by useGetFlag to retrieve a specific variable
    // Replace 'variableKey' with the actual key for the variable you want to retrieve
    const variableKey = 'variable_name'; // Replace with actual variable key
    const variableValue = useGetFlagVariable(flag, variableKey, 'default_value');

    // Display the feature flag variable value
    return (
      <div>
        <p>Feature Flag Variable Value: {variableValue}</p>
      </div>
    );
  }

  // Display a message if the feature is not enabled
  return (
    <div>
      <p>Feature is not enabled!</p>
    </div>
  );
};

export default YourComponent;
```

## Advanced Configuration Options

To customize the SDK further, additional parameters can be passed to the `VWOProvider` component. Here’s a table describing each option:

| **Parameter**  | **Description**                                                                                                                                             | **Required** | **Type** | **Example**                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ------------------------------- |
| `accountId`    | VWO Account ID for authentication.                                                                                                                          | Yes          | String   | `'123456'`                      |
| `sdkKey`       | SDK key corresponding to the specific environment to initialize the VWO SDK Client. You can get this key from VWO Application.                              | Yes          | String   | `'32-alpha-numeric-sdk-key'`    |
| `pollInterval` | Time interval for fetching updates from VWO servers (in milliseconds).                                                                                      | No           | Number   | `60000`                         |
| `storage`      | Custom storage connector for persisting user decisions and campaign data.                                                                                   | No           | Object   | See [Storage](#storage) section |
| `logger`       | Toggle log levels for more insights or for debugging purposes. You can also customize your own transport in order to have better control over log messages. | No           | Object   | See [Logger](#logger) section   |

Refer to the [official VWO documentation](https://developers.vwo.com/v2/docs/fme-react-initialization) for additional parameter details.

### User Context

The `context` object uniquely identifies users and is crucial for consistent feature rollouts. A typical `context` includes an `id` for identifying the user. It can also include other attributes that can be used for targeting and segmentation, such as `customVariables`, `userAgent` and `ipAddress`.

#### Parameters Table

The following table explains all the parameters in the `context` object:

| **Parameter**     | **Description**                                                            | **Required** | **Type** | **Example**                       |
| ----------------- | -------------------------------------------------------------------------- | ------------ | -------- | --------------------------------- |
| `id`              | Unique identifier for the user.                                            | Yes          | String   | `'unique_user_id'`                |
| `customVariables` | Custom attributes for targeting.                                           | No           | Object   | `{ age: 25, location: 'US' }`     |
| `userAgent`       | User agent string for identifying the user's browser and operating system. | No           | String   | `'Mozilla/5.0 ... Safari/537.36'` |
| `ipAddress`       | IP address of the user.                                                    | No           | String   | `'1.1.1.1'`                       |

#### Example

```javascript
const userContext = {
  id: 'unique_user_id',
  customVariables: { age: 25, location: 'US' },
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  ipAddress: '1.1.1.1',
};
```

### Basic Feature Flagging

Feature Flags serve as the foundation for all testing, personalization, and rollout rules within FME.
To implement a feature flag, first use the `useGetFlag` hook to retrieve the flag configuration.
The `useGetFlag` hook provides a simple way to check if a feature is enabled for a specific user and access its variables. It returns a feature flag object that contains methods for checking the feature's status and retrieving any associated variables.

| Parameter    | Description                                                    | Required | Type   | Example                   |
| ------------ | -------------------------------------------------------------- | -------- | ------ | ------------------------- |
| `featureKey` | Unique identifier of the feature flag                          | Yes      | String | `'new_checkout'`          |
| `context`    | User Context to be passed, if not at the time of `VWOProvider` | No       | Object | `{ id: 'unique_user_id'}` |

Example usage:

```javascript
import React from 'react';
import { useGetFlag, useGetFlagVariable } from 'vwo-fme-react-sdk'; // Import hooks

const YourComponent = () => {
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key');

  // Or, pass userContext, if not provided at the time of using VWOProvider or you want to use updated user context
  // const { flag, isReady } = useGetFlag('feature_key', userContext);

  if (!isReady()) {
    return <div>Default/Zero state</div>;
  }
  // Check if the flag is enabled
  const isEnabled = flag?.isEnabled();
  if (isEnabled) {
    // Use the flag object returned by useGetFlag to retrieve a specific variable
    // Replace 'variableKey' with the actual key for the variable you want to retrieve
    const variableKey = 'variable_name'; // Replace with actual variable key
    const variableValue = useGetFlagVariable(flag, variableKey, 'default_value');

    // Display the feature flag variable value
    return (
      <div>
        <p>Feature Flag Variable Value: {variableValue}</p>
      </div>
    );
  }

  // Display a message if the feature is not enabled
  return (
    <div>
      <p>Feature is not enabled!</p>
    </div>
  );
};

export default YourComponent;
```

### Custom Event Tracking

Feature flags can be enhanced with connected metrics to track key performance indicators (KPIs) for your features. These metrics help measure the effectiveness of your testing rules by comparing control versus variation performance, and evaluate the impact of personalization and rollout campaigns. Use the `useTrackEvent` hook to track custom events like conversions, user interactions, and other important metrics:

| Parameter         | Description                                              | Required | Type   | Example                |
| ----------------- | -------------------------------------------------------- | -------- | ------ | ---------------------- |
| `eventName`       | Name of the event you want to track                      | Yes      | String | `'purchase_completed'` |
| `eventProperties` | Additional properties/metadata associated with the event | No       | Object | `{ amount: 49.99 }`    |

Example usage:

```javascript
import { useTrackEvent } from 'vwo-fme-react-sdk'; // Import the hook

const YourComponent = () => {
  // Track an event when a button is clicked, the second parameter for useTrackEvent is optional.
  useTrackEvent('button_click', { userType: 'premium' });
};

export default YourComponent;
```

See [Tracking Conversions](https://developers.vwo.com/v2/docs/fme-react-metrics-tracking#usage) documentation for more information.

### Pushing Attributes

User attributes provide rich contextual information about users, enabling powerful personalization. The `useSetAttribute` hook provides a simple way to associate these attributes with users in VWO for advanced segmentation. Here's what you need to know about the method parameters:

| Parameter      | Description                                                                                                                        | Required | Type   | Example                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ----------------------------- |
| `attributeMap` | A key-value map of attributes to set for the user. The keys are attribute names and values are the corresponding attribute values. | Yes      | Object | `{ age: 25, location: 'US' }` |

Example usage:

```javascript
import { useSetAttribute } from 'vwo-fme-react-sdk'; // Import the hook

const YourComponent = () => {
  // Set attributes for the user
  useSetAttribute({ age: 25, location: 'US' });
};

export default YourComponent;
```

See [Pushing Attributes](https://developers.vwo.com/v2/docs/fme-react-attributes#usage) documentation for additional information.

### Polling Interval Adjustment

The `pollInterval` is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```javascript
const vwoConfig = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  pollInterval: 60000, // Time interval for fetching updates from VWO servers (in milliseconds)
};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={{ id: 'unique_user_id' }}>
    <YourComponent />
  </VWOProvider>
);
```

### Storage

The SDK operates in a stateless mode by default, meaning each `useGetFlag` hook triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, you can implement a custom storage mechanism by passing a `storage` parameter during initialization. This allows you to persist feature flag decisions in your preferred database system (like Redis, MongoDB, or any other data store).

Key benefits of implementing storage:

- Improved performance by caching decisions
- Consistent user experience across sessions
- Reduced load on your application

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

```javascript
import { VWOProvider } from 'vwo-fme-react-sdk';

class StorageConnector extends StorageConnector {
  constructor() {
    super();
  }

  /**
   * Get data from storage
   * @param {string} featureKey
   * @param {string} userId
   * @returns {Promise<any>}
   */
  async get(featureKey, userId) {
    // return await data (based on featureKey and userId)
  }

  /**
   * Set data in storage
   * @param {object} data
   */
  async set(data) {
    // Set data corresponding to a featureKey and user ID
    // Use data.featureKey and data.userId to store the above data for a specific feature and a user
  }
}

const vwoConfig = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
  storage: StorageConnector,
};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={{ id: 'unique_user_id' }}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

### Logger

VWO by default logs all `ERROR` level messages to your server console.
To gain more control over VWO's logging behaviour, you can use the `logger` parameter in the `init` configuration.

| **Parameter** | **Description**                        | **Required** | **Type** | **Example**           |
| ------------- | -------------------------------------- | ------------ | -------- | --------------------- |
| `level`       | Log level to control verbosity of logs | Yes          | String   | `DEBUG`               |
| `prefix`      | Custom prefix for log messages         | No           | String   | `'CUSTOM LOG PREFIX'` |

#### Example 1: Set log level to control verbosity of logs

```javascript
const options = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug',
  },
};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={{ id: 'unique_user_id' }}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

#### Example 2: Add custom prefix to log messages for easier identification

```javascript
const options = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug',
    prefix: 'CUSTOM LOG PREFIX', // custom logger prefix
  },
};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={{ id: 'unique_user_id' }}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

### Version History

The version history tracks changes, improvements, and bug fixes in each version. For a full history, see the [CHANGELOG.md](https://github.com/wingify/vwo-fme-react-sdk/blob/master/CHANGELOG.md).

## Development and Testing

### Install Dependencies and Bootstrap Git Hooks

```bash
yarn install
```

### Compile TypeScript to JavaScript

```bash
yarn build
```

## Contributing

We welcome contributions to improve this SDK! Please read our [contributing guidelines](https://github.com/wingify/vwo-fme-react-sdk/blob/master/CONTRIBUTING.md) before submitting a PR.

## Code of Conduct

Our [Code of Conduct](https://github.com/wingify/vwo-fme-react-sdk/blob/master/CODE_OF_CONDUCT.md) outlines expectations for all contributors and maintainers.

## License

[Apache License, Version 2.0](https://github.com/wingify/vwo-fme-react-sdk/blob/master/LICENSE)

Copyright 2025 Wingify Software Pvt. Ltd.
