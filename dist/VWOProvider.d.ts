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
interface VWOProviderProps {
  client?: any;
  config?: any;
  userContext?: any;
  children: ReactNode;
}
/**
 * VWOProvider component to provide VWO client and configuration context to child components.
 *
 * @param {Object} props - The properties for the VWOProvider component.
 * @param {Object} props.client - The VWO client instance.
 * @param {Object} props.config - Configuration settings for the VWO client.
 * @param {Object} props.userContext - Initial user context for the VWO client.
 * @param {React.ReactNode} props.children - Child components that will have access to the VWO context.
 * @returns {JSX.Element} The provider component wrapping its children with VWO context.
 */
export declare const VWOProvider: React.FC<VWOProviderProps>;
export {};
