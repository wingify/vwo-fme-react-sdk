# VWO Feature Management and Experimentation SDK for React SDK

[![npm version](https://img.shields.io/npm/v/vwo-fme-react-sdk?style=for-the-badge&color=grey&logo=npm)](https://www.npmjs.com/package/vwo-fme-react-sdk) [![License](https://img.shields.io/github/license/wingify/vwo-fme-react-sdk?style=for-the-badge&color=blue)](http://www.apache.org/licenses/LICENSE-2.0) ![](http://img.badgesize.io/wingify/vwo-fme-react-sdk/master/dist/vwo-fme-react-sdk.cjs.production.min.js?compression=gzip&color=blue&style=for-the-badge)

[![CI](https://img.shields.io/github/actions/workflow/status/wingify/vwo-fme-react-sdk/main.yml?style=for-the-badge&logo=github)](https://github.com/wingify/vwo-fme-react-sdk/actions?query=workflow%3ACI) [![codecov](https://img.shields.io/codecov/c/github/wingify/vwo-fme-react-sdk?token=813UYYMWGM&style=for-the-badge&logo=codecov)](https://codecov.io/gh/wingify/vwo-fme-react-sdk)

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

## Getting Started with VWOProvider

### Basic Implementation

```tsx
import React from 'react';
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

const userContext: IVWOContextModel = {
  id: 'unique_user_id', // Required: Unique identifier for the user
  customVariables: { age: 25, location: 'US' }, // Optional
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', // Optional
  ipAddress: '1.1.1.1', // Optional
};

// Optional: Provide a fallback UI component that will be displayed while VWOProvider initializes.
// This is useful for showing a loading state or placeholder content during SDK initialization.
const fallbackComponent = <div>Initializing VWO...</div>;

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

### Using Pre-initialized VWO Client

If you have already initialized a VWO client in your application, you can pass it directly to the VWOProvider:

```typescript
import React, { useEffect, useState } from 'react';
import { VWOProvider, IVWOOptions, IVWOClient, IVWOContextModel, init } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Replace with your real SDK key
  accountId: '123456', // Replace with your real account ID
  logger: {
    level: 'debug',
  },
};

const userContext: IVWOContextModel = {
  id: 'unique_user_id',
  customVariables: { age: 25, location: 'US' },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  ipAddress: '1.1.1.1',
};

const fallbackComponent = <div>Initializing VWO...</div>;

const App = () => {
  const [vwoClient, setVwoClient] = useState<IVWOClient | null>(null);

  useEffect(() => {
    const initializeVWO = async () => {
      const client = await init(vwoConfig);
      setVwoClient(client);
    };

    initializeVWO();
  }, []);

  if (!vwoClient) return fallbackComponent;

  return (
    <VWOProvider client={vwoClient} userContext={userContext}>
      <YourComponent />
    </VWOProvider>
  );
};

export default App;
```

### Basic Implementation without User Context

If you don't have user details available while initialising the VWOProvider you can pass it later in `useGetFlag` hook.

```typescript
import React from 'react';
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

// Optional: Provide a fallback UI component that will be displayed while VWOProvider initializes.
// This is useful for showing a loading state or placeholder content during SDK initialization.
const fallbackComponent = <div>Initializing VWO...</div>;

const App = () => (
  <VWOProvider config={vwoConfig} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>
);

export default App;

```

To learn more about on how to pass context in `useGetFlag` hook, [click here](#basic-feature-flagging).

## Advanced Configuration Options

To customize the SDK further, additional parameters can be passed to the `VWOProvider` component using `config` parameter. Here’s a table describing each option:

| **Parameter**  | **Description**                                                                                                                                             | **Required** | **Type** | **Example**                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ------------------------------- |
| `accountId`    | VWO Account ID for authentication.                                                                                                                          | Yes          | String   | `'123456'`                      |
| `sdkKey`       | SDK key corresponding to the specific environment to initialize the VWO SDK Client. You can get this key from VWO Application.                              | Yes          | String   | `'32-alpha-numeric-sdk-key'`    |
| `pollInterval` | Time interval for fetching updates from VWO servers (in milliseconds).                                                                                      | No           | Number   | `60000`                         |
| `storage`      | Custom storage connector for persisting user decisions and campaign data.                                                                                   | No           | Object   | See [Storage](#storage) section |
| `logger`       | Toggle log levels for more insights or for debugging purposes. You can also customize your own transport in order to have better control over log messages. | No           | Object   | See [Logger](#logger) section   |

Refer to the [official VWO documentation](https://developers.vwo.com/v2/docs/fme-react-initialization) for additional parameter details.

## Available Hooks

The VWO FME React SDK offers a comprehensive suite of React hooks that enable seamless integration of feature management and experimentation capabilities into your application. Here are the key hooks available:

| Hook                  | Definition                                                     | Example                                                             |
| --------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| `useGetFlag`          | Retrieve feature flag status and variables for a specific user | [Learn how to use feature flags](#basic-feature-flagging)           |
| `useGetFlagVariable`  | Access individual feature flag variables                       | [Learn how to access individual variables](#basic-feature-flagging) |
| `useGetFlagVariables` | Get all variables associated with a feature flag               | [Learn how to access all flag variables](#basic-feature-flagging)   |
| `useTrackEvent`       | Track custom events and user interactions                      | [Learn how to track user events](#custom-event-tracking)            |
| `useSetAttribute`     | Set user attributes for targeting and segmentation             | [Learn how to set user attributes](#pushing-attributes)             |
| `useVWOClient`        | Access the underlying VWO client instance                      | [Learn how to access VWO client](#vwo-client-usage)                 |

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

```typescript
import { IVWOContextModel } from 'vwo-fme-react-sdk';

const userContext: IVWOContextModel = {
  id: 'unique_user_id',
  customVariables: { age: 25, location: 'US' },
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  ipAddress: '1.1.1.1',
};
```

### VWO Client Usage

The `useVWOClient` hook provides direct access to the underlying VWO client instance, allowing you to utilize all available VWO client methods like `getFlag`, `trackEvent` and `setAttribute`.

#### Hook Return Type

| Property    | Description                                                                | Type         |
| ----------- | -------------------------------------------------------------------------- | ------------ |
| `vwoClient` | VWO client instance with access to all client methods                      | `IVWOClient` |
| `isReady`   | Boolean indicating whether the VWO SDK client has initialized successfully | `boolean`    |

#### Example Usage

```typescript
import React, { useEffect, useState } from 'react';
import { useVWOClient, IVWOContextModel } from 'vwo-fme-react-sdk';

const FeatureFlagComponent = () => {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
  const {vwoClient, isReady } = useVWOClient();

  useEffect(() => {
    const checkFeature = async () => {
      if (!isReady) {
        console.log('VWO Client not available');
        return;
      }

      // Define user context (could be dynamic)
      const userContext: IVWOContextModel = { id: 'unique_user_id' };

      try {
        // Fetch the feature flag using getFlag method
        const flag = await vwoClient.getFlag('feature_key', userContext);

        // Check if the feature is enabled
        setIsFeatureEnabled(flag.isEnabled());
      } catch (error) {
        console.error('Error checking feature flag:', error);
      }
    };

    checkFeature();
  }, [vwoClient, isReady]);

  return (
    <div>
      {isFeatureEnabled ? (
        <p>The feature is enabled!</p>
      ) : (
        <p>The feature is not enabled.</p>
      )}
    </div>
  );
};

export default FeatureFlagComponent;
```

### Basic Feature Flagging

Feature Flags serve as the foundation for all testing, personalization, and rollout rules within FME.
To implement a feature flag, first use the `useGetFlag` hook to retrieve the flag configuration.
The `useGetFlag` hook provides a simple way to check if a feature is enabled for a specific user and access its variables. It returns a feature flag object that contains methods for checking the feature's status and retrieving any associated variables.

#### Hook Parameters

| Parameter    | Description                                                    | Required | Type   | Example                   |
| ------------ | -------------------------------------------------------------- | -------- | ------ | ------------------------- |
| `featureKey` | Unique identifier of the feature flag                          | Yes      | String | `'new_checkout'`          |
| `context`    | User Context to be passed, if not at the time of `VWOProvider` | No       | Object | `{ id: 'unique_user_id'}` |

#### Hook Return Type

The `useGetFlag` hook returns a flag object and an `isReady` boolean that indicates when the VWO SDK client has initialized and the flag data is available.

| Property  | Description                                                                | Type      |
| --------- | -------------------------------------------------------------------------- | --------- |
| `flag`    | Feature flag object containing status and variables                        | `IFlag`   |
| `isReady` | Boolean indicating whether the VWO SDK client has initialized successfully | `boolean` |

The `IFlag` object contains methods and properties for checking feature status and accessing variables. It is recommended to check `isReady` before using the `flag` object to ensure proper initialization.

Use the `isReady` flag to determine when the feature flag data has been fully initialized and is safe to access. This helps prevent rendering based on incomplete or default flag values, thereby avoiding flicker or inconsistent UI states.

Example Usage if `userContext` was already provided in `VWOProvider`.

```typescript
import React from 'react';
import { useGetFlag, useGetFlagVariable, useGetFlagVariables } from 'vwo-fme-react-sdk'; // Import hooks

const YourComponent = () => {
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key');

  // Or, pass userContext, if not provided at the time of using VWOProvider or you want to use updated user context
  // const { flag, isReady } = useGetFlag('feature_key', userContext);

  if (!isReady) { return <div>Default/Zero state</div>; }

  // Use the flag object returned by useGetFlag to retrieve a specific variable
  const variableValue = useGetFlagVariable(flag, "variable-value", "default-value");
  const allVariable = useGetFlagVariable(flag);

  return (
    <div>
      {/* Display the feature flag variable value */}
      <p>Feature Flag Variable Value: {variableValue}</p>
    </div>
  );
};

export default YourComponent;
```

Example Usage if `userContext` was not provided in `VWOProvider`.

```typescript
import React from 'react';
import { useGetFlag, useGetFlagVariable, IVWOContextModel } from 'vwo-fme-react-sdk'; // Import hooks

const YourComponent = () => {

  const userContext: IVWOContextModel = {
    id: 'unique_user_id',
    customVariables: { age: 25, location: 'US' },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    ipAddress: '1.1.1.1',
  };
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key', userContext);

  if (!isReady) { return <div>Default/Zero state</div>; }

  // Use the flag object returned by useGetFlag to retrieve a specific variable
  const variableValue = useGetFlagVariable(flag, "variable-value", "default-value");

  return (
    <div>
      {/* Display the feature flag variable value */}
      <p>Feature Flag Variable Value: {variableValue}</p>
    </div>
  );
};

export default YourComponent;
```

### Custom Event Tracking

Feature flags can be enhanced with connected metrics to track key performance indicators (KPIs) for your features. These metrics help measure the effectiveness of your testing rules by comparing control versus variation performance, and evaluate the impact of personalization and rollout campaigns. Use the `useTrackEvent` hook to track custom events like conversions, user interactions, and other important metrics.

The `useTrackEvent` hook returns an object containing a `trackEvent` function and an `isReady` boolean. The `trackEvent` function allows you to track custom events and conversions, while `isReady` indicates if the hook is ready to be used. The `trackEvent` function accepts the following parameters:

| Parameter         | Description                                              | Required | Type   | Example                |
| ----------------- | -------------------------------------------------------- | -------- | ------ | ---------------------- |
| `eventName`       | Name of the event you want to track                      | Yes      | String | `'purchase_completed'` |
| `eventProperties` | Additional properties/metadata associated with the event | No       | Object | `{ amount: 49.99 }`    |

Example usage:

```javascript
import { useTrackEvent } from 'vwo-fme-react-sdk';

function YourComponent() {
  const { trackEvent, isReady } = useTrackEvent();

  return <button onClick={() => trackEvent('button_clicked')}>Click Me</button>;
}
```

See [Tracking Conversions](https://developers.vwo.com/v2/docs/fme-react-metrics-tracking#usage) documentation for more information.

### Pushing Attributes

User attributes provide rich contextual information about users, enabling powerful personalization. The `useSetAttribute` hook provides a simple way to associate these attributes with users in VWO for advanced segmentation.
The `useSetAttribute` hook returns an object containing a `setAttribute` function and an `isReady` boolean. The `setAttribute` allows you to set user attribute, while `isReady` indicates if the hook is ready to be used. This `setAttribute` function accepts the following parameters:

| Parameter      | Description                                                                                                                        | Required | Type   | Example                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ----------------------------- |
| `attributeMap` | A key-value map of attributes to set for the user. The keys are attribute names and values are the corresponding attribute values. | Yes      | Object | `{ age: 25, location: 'US' }` |

Example usage:

```javascript
import { useSetAttribute } from 'vwo-fme-react-sdk';

function YourComponent() {
  const { setAttribute, isReady } = useSetAttribute();

  return <button onClick={() => setAttribute({ age: 25, location: 'US' })}>Click Me</button>;
}
```

See [Pushing Attributes](https://developers.vwo.com/v2/docs/fme-react-attributes#usage) documentation for additional information.

### Polling Interval Adjustment

The `pollInterval` is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  pollInterval: 60000, // Time interval for fetching updates from VWO servers (in milliseconds)
};

const userContext: IVWOContextModel = { id: 'unique_user_id' };

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
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

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel, StorageConnector } from 'vwo-fme-react-sdk';

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

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
  storage: StorageConnector,
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
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

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug',
  },
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

#### Example 2: Add custom prefix to log messages for easier identification

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug',
    prefix: 'CUSTOM LOG PREFIX', // custom logger prefix
  },
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
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
