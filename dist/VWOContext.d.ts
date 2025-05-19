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
/// <reference types="react" />
import { IVWOClient, IVWOContextModel } from 'vwo-fme-node-sdk';
interface VWOContextType {
  vwoClient: IVWOClient | null;
  userContext?: IVWOContextModel | null;
  setUserContext?: (context: IVWOContextModel) => void;
  isReady?: boolean;
}
export declare const VWOContext: import('react').Context<VWOContextType>;
export declare const useVWOContext: () => VWOContextType | null;
export {};
