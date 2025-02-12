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
import { ReactNode } from 'react';
/**
 * Props for VWOProvider
 */
interface VWOProviderProps {
  client?: any;
  config?: any;
  context: any;
  children: ReactNode;
}
/**
 * VWOProvider component to provide the VWO SDK instance and context to the app
 * @param client - VWO SDK instance
 * @param config - VWO SDK config (initialization config)
 * @param context - VWO SDK context (userContext)
 * @param children - React children (ReactNode)
 * @returns VWOProvider component
 */
export declare const VWOProvider: ({ client, config, context, children }: VWOProviderProps) => any;
export {};
