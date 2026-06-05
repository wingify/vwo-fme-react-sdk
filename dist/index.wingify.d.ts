/**
 * Copyright 2025-2026 Wingify Software Pvt. Ltd.
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
import React, { ReactNode } from 'react';
import { IWingifyClient, IWingifyContextModel, IWingifyOptions } from 'wingify-fme-node-sdk';
export interface WingifyProviderWithClient {
  client: IWingifyClient;
  userContext?: IWingifyContextModel;
  children: ReactNode;
  fallbackComponent?: ReactNode;
}
export interface WingifyProviderWithConfig {
  config: IWingifyOptions;
  userContext?: IWingifyContextModel;
  children: ReactNode;
  fallbackComponent?: ReactNode;
}
export declare type IWingifyProvider = WingifyProviderWithClient | WingifyProviderWithConfig;
export declare function WingifyProvider(props: IWingifyProvider): React.ReactElement;
export { useVWOClient as useWingifyClient } from './useVWOClient';
export { useGetFlag } from './useGetFlag';
export type { IFlag } from './useGetFlag';
export { useGetFlagVariable } from './useGetFlagVariable';
export { useGetFlagVariables } from './useGetFlagVariable';
export { useTrackEvent } from './useTrackEvent';
export type { ITrackEvent } from './useTrackEvent';
export { useSetAttribute } from './useSetAttribute';
export type { ISetAttribute } from './useSetAttribute';
export { useVWOContext as useWingifyContext } from './VWOContext';
export {
  init,
  IWingifyContextModel,
  IWingifyClient,
  IWingifyOptions,
  Flag,
  StorageConnector,
  LogLevelEnum,
  getUUID,
  ISettingsData,
} from 'wingify-fme-node-sdk';
export declare type WingifyClientResult = {
  vwoClient: import('wingify-fme-node-sdk').IWingifyClient | null;
  isReady: boolean;
};
