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
import React, { ReactNode } from 'react';
import { IVWOContextModel, IVWOClient, IVWOOptions } from 'vwo-fme-node-sdk';
export interface VWOProviderWithClient {
  client: IVWOClient;
  userContext?: IVWOContextModel;
  children: ReactNode;
  fallbackComponent?: ReactNode;
}
export interface VWOProviderWithConfig {
  config: IVWOOptions;
  userContext?: IVWOContextModel;
  children: ReactNode;
  fallbackComponent?: ReactNode;
}
export declare type IVWOProvider = VWOProviderWithClient | VWOProviderWithConfig;
/**
 * VWOProvider component to provide VWO client and configuration context to child components.
 *
 * @param props - The props for the VWOProvider component.
 * @returns A React element that provides the VWO client and configuration context to child components.
 */
export declare function VWOProvider(props: IVWOProvider): React.ReactElement;
