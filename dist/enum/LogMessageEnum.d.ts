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
export declare enum LogMessageEnum {
  VWO_CLIENT_MISSING = 'VWO Client is missing in {hookName} hook. Ensure VWOProvider is correctly initialized.',
  INVALID_CONTEXT = 'Invalid user context in {hookName} hook. Ensure a valid userContext is provided.',
  HOOK_ERROR = 'Error in {hookName} hook: {error}',
  INVALID_HOOK_USAGE = '{hookName} must be used within a VWOProvider !!',
  VWO_PROVIDER_CLIENT_CONFIG_WARNING = 'VWOProvider Warning: Both `client` and `config` are provided. The `client` prop will take precedence, and the `config` props will be disregarded.',
  VWO_PROVIDER_CONFIG_REQUIRED = 'VWOProvider Error: Either `client` or `config` must be provided.',
  VWO_SDK_INITIALIZATION_FAILED = 'VWO-SDK Initialization failed: {error}',
  VWO_TRACK_EVENT_NAME_REQUIRED = 'Event name is required for useTrackEvent hook and it should be a string',
  VWO_TRACK_EVENT_ERROR = 'Error tracking event - {eventName}: {error}',
  VWO_SET_ATTRIBUTE_MAP_REQUIRED = 'attributeMap (object having key-value pairs of user attributes) is required for useSetAttribute hook',
  VWO_SET_ATTRIBUTE_ERROR = 'Error setting attributes: {error}',
  VWO_SET_ATTRIBUTE_SUCCESS = 'User attributes set: {attributes}',
  VWO_NOT_READY_IN_USE_GET_FLAG = 'VWO is not ready in useGetFlag hook',
  VWO_GET_FLAG_FEATURE_KEY_REQUIRED = 'Feature key is required for useGetFlag hook',
  VWO_GET_FLAG_ERROR = 'Error fetching feature flag - {featureKey}: {error}',
  VWO_GET_FLAG_VARIABLES_FLAG_REQUIRED = 'Flag is required for useGetFlagVariables hook and should be an object',
  VWO_GET_FLAG_VARIABLES_ERROR = 'Error getting flag variables: {error}',
  VWO_GET_FLAG_VARIABLE_REQUIRED = 'Flag and variable key are required for useGetFlagVariable hook',
  VWO_GET_FLAG_VARIABLE_ERROR = 'Error getting flag variable: {error}',
}
