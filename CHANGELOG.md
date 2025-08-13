# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2025-08-13

### Changed

- Added support for ES Modules(ESM) bundles.
- Added support for sending a one-time initialization event to the server to verify correct SDK setup, as part of VWO App milestones.

## [1.6.0] - 2025-08-01

### Changed

- Enhanced error handling capabilities throughout the SDK for improved reliability and debugging experience.

## [1.5.2] - 2025-07-25

### Added

- Send the SDK name and version in the events and batching call to VWO as query parameters.

## [1.5.1] - 2025-07-24

### Added

- Send the SDK name and version in the settings call to VWO as query parameters.

## [1.5.0] - 2025-07-24

### Added

- Enhanced storage configuration options for browser environments with new features:

  - Added custom `ttl` (Time To Live) option to control how long settings remain valid in storage
  - Added `alwaysUseCachedSettings` option to always use cached settings regardless of TTL
  - Default TTL remains 2 hours if not specified

  ```jsx
  const vwoConfig = {
    accountId: 'VWO_ACCOUNT_ID',
    sdkKey: 'VWO_SDK_KEY',

    clientStorage: {
      key: 'vwo_data', // defaults to vwo_fme_settings
      provider: sessionStorage, // defaults to localStorage
      isDisabled: false, // defaults to false
      alwaysUseCachedSettings: true, // defaults to false
      ttl: 3600000, // 1 hour in milliseconds, defaults to 2 hours
    },
  };

  <VWOProvider config={vwoConfig} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>;
  ```

  These new options provide more control over how settings are cached and refreshed:

  - When `alwaysUseCachedSettings` is true, the SDK will always use cached settings if available, regardless of TTL
  - Custom `ttl` allows you to control how frequently settings are refreshed from the server
  - Settings are still updated in the background to keep the cache fresh

  Read more [here](https://developers.vwo.com/v2/docs/fme-react-cache-settings)

- Added configurable retry mechanism for network requests with partial override support. You can now customize retry behavior by passing a `retryConfig` in the `network` options:

  ```jsx
  const vwoConfig = {
    accountId: 'VWO_ACCOUNT_ID',
    sdkKey: 'VWO_SDK_KEY',

    retryConfig: {
      shouldRetry: true, // Turn retries on/off (default: true)
      maxRetries: 3, // How many times to retry (default: 3)
      initialDelay: 2, // First retry after 2 seconds (default: 2)
      backoffMultiplier: 2, // Double the delay each time (delays: 2s, 4s, 8s)
    },
  };

  <VWOProvider config={vwoConfig} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>;
  ```

- Added support for redirecting all network calls through a custom proxy URL for browser environments. This feature allows users to route all SDK network requests (settings, tracking, etc.) through their own proxy server. This is particularly useful for bypassing ad-blockers that may interfere with VWO's default network requests.

  ```jsx
  const vwoConfig = {
    accountId: 'VWO_ACCOUNT_ID',
    sdkKey: 'VWO_SDK_KEY',

    // All network calls will be routed through this URL
    proxyUrl: 'https://your-proxy-server.com',
  };

  <VWOProvider config={vwoConfig} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>;
  ```

- Added support for polling intervals to periodically fetch and update settings:

  - If `pollInterval` is set in options (must be >= 1000 milliseconds), that interval will be used
  - If `pollInterval` is configured in VWO application settings, that will be used
  - If neither is set, defaults to 10 minute polling interval

  Example usage:

  ```jsx
  const vwoConfig = {
    accountId: 'VWO_ACCOUNT_ID',
    sdkKey: 'VWO_SDK_KEY',

    // Set the poll interval to 60 seconds,
    pollInterval: 60000,
  };

  <VWOProvider config={vwoConfig} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>;
  ```

### Fixed

- Updated regex in `addIsGatewayServiceRequiredFlag` method to remove unsupported lookbehind and named capture groups, ensuring compatibility with older browsers like Safari 16.3 (`SyntaxError: Invalid regular expression: invalid group specifier name`).

## [1.4.0] - 2025-06-12

### Changed

- Replaced the copy-pasted modules with the monorepo VWO JavaScript packages @wingify/service-logger and @wingify/util-data-type as dependencies. This helps reduce the SDK size by approximately 40%.
- Updated `vwo-fme-node-sdk` dependency version:
  - to bring in-built storage capabilities leveraging `localStorage`.
  - to remove Gateway Service dependency for using location and UA pre-segmentation options.

## [1.3.0] - 2025-05-20

### Changed

- Modify `module` paths in `package.json`

## [1.2.0] - 2025-05-20

### Changed

- Export `LogLevelEnum` to be used for setting log level.

```js
import { IVWOOptions, LogLevelEnum } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  accountId: 'VWO_ACCOUNT_ID',
  sdkKey: 'VWO_SDK_KEY',

  logger: {
    level: LogLevelEnum.DEBUG
  },
};
```

## [1.1.0] - 2025-05-20

### Added

- `fallbackComponent` prop in `VWOProvider`
  Introduced a new `fallbackComponent` prop to the `VWOProvider` component. This allows rendering a fallback UI (e.g., loading indicator) while the VWO SDK is initializing and fetching configuration settings.

  ```jsx
  const fallbackComponent = <div>Loading VWO...</div>;

  const App = () => (
    <VWOProvider config={vwoConfig} fallbackComponent={fallbackComponent}>
      <YourComponent />
    </VWOProvider>
  );
  ```

- `isReady` flag in `useVWOClient` hook
  Added an `isReady` flag to the `useVWOClient` hook, indicating when the VWO client SDK is fully initialized and ready. This ensures SDK methods (e.g., `getFlag`) are called only after the client is available.

  ```tsx
  const FeatureFlagComponent = () => {
    const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
    const { vwoClient, isReady } = useVWOClient();

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

    return <div>{isFeatureEnabled ? <p>The feature is enabled!</p> : <p>The feature is not enabled.</p>}</div>;
  };
  ```

- Added unit tests using `Jest`
  Added comprehensive unit tests using Jest for critical SDK components and hooks to improve code reliability and test coverage. Specifically:

  - `VWOProvider`: Verified fallback rendering and context initialization.
  - `useVWOClient` hook: Ensured proper handling of `vwoClient` and `isReady` flag states.
  - `useTrackEvent` hook: Validated that the `trackEvent` function is returned and behaves as expected.
  - `useSetAttribute` hook: Checked that attributes are correctly set and propagated.
  - **SDK initialization logic**: Mocked and tested interaction with the VWO SDK to ensure correct setup and error handling.

  Tests include coverage for happy paths, error scenarios, and edge cases, helping ensure stability across diverse usage contexts.

### Changed

- `useTrackEvent` hook enhancement
  Updated the `useTrackEvent` hook to return the `trackEvent` function, enabling it to be called imperatively without relying on the component lifecycle.

  ```jsx
  import { useTrackEvent } from 'vwo-fme-react-sdk';

  function YourComponent() {
    const { trackEvent, isReady } = useTrackEvent();

    return <button onClick={() => trackEvent('button_clicked')}>Click Me</button>;
  }
  ```

- `useSetAttribute` hook enhancement
  Updated the `useSetAttribute` hook to return the `setAttribute` function for programmatic updates of user attributes.

  ```jsx
  import { useSetAttribute } from 'vwo-fme-react-sdk';

  function YourComponent() {
    const { setAttribute, isReady } = useSetAttribute();

    return <button onClick={() => setAttribute({ age: 25, location: 'US' })}>Click Me</button>;
  }
  ```

- Improved `TypeScript` support
  The SDK now leverages stricter and more accurate TypeScript types, improving developer experience and safety. Relevant interfaces such as `IVWOClient`, `IVWOOptions`, `IVWOContextModel`, `IVWOProvider`, `Flag`, etc. are now exported for external use.

- `main`, `module`, and `browser` fields now point to minified files
  Updated the `package.json` configuration to ensure `main`, `module`, and `browser` entries reference minified production-ready builds (`*.min.js`). This optimizes performance and bundle size for consumers of the SDK in both browser and Node environments.

- Documentation update
  Refreshed `README.md` with updated examples and documentation for new and existing features, ensuring clarity for developers integrating the SDK.

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
    accountId: 'VWO_ACCOUNT_ID',
    sdkKey: 'VWO_SDK_KEY',

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
