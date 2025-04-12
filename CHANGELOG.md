# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-04-12

### Changed

- Stable Release of VWO FME React SDK

### Fixed

- Update dependency of `useMemo` hook inside `useGetFlag` hook

## [0.2.0] - 2025-04-11

### Added

- Ensure compatibility with older versions that do not support optional chaining.
- Allow user context to be optionally passed to the `useGetFlag` hook, enabling it to override the context provided to the `VWOProvider` hook.

## [0.1.0] - 2025-02-13

### Added

- The **VWO Feature Management and Experimentation SDK** (VWO FME React SDK) enables React.js developers to integrate feature flagging and experimentation into their applications. This SDK provides full control over feature rollout, A/B testing, and event tracking, allowing teams to manage features dynamically and gain insights into user behavior.

  #### Basic Usage

  ```typescript
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

  ### Feature flag and variables Usage

  ```javascript
  import React from 'react';
  import { useGetFlag, useGetFlagVariable } from 'vwo-fme-react-sdk'; // Import hooks

  const YourComponent = () => {
    // Retrieve the flag using the feature key
    const flag = useGetFlag('feature_key');

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
