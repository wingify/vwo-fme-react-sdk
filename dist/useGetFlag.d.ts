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
/**
 * Custom hook to retrieve a feature flag using VWO client.
 *
 * @param {string} featureKey - The key of the feature flag to retrieve.
 * @param {Object} [context] - Optional user context to use for fetching the flag.
 * @returns {Object} An object containing the flag and a readiness status.
 */
export declare const useGetFlag: (
  featureKey: string,
  context?: any,
) => {
  flag: any;
  isReady: () => boolean;
};
