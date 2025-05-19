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
 * Interface for the return type of useTrackEvent hook
 */
export interface ITrackEvent {
  trackEvent: (
    eventName: string,
    eventProperties?: Record<string, string | number | boolean>,
  ) => Promise<Record<string, boolean>>;
  isReady: boolean;
}
/**
 * Hook to provide the trackEvent function for tracking events.
 * @returns {ITrackEvent} Object containing trackEvent function and isReady boolean
 */
export declare const useTrackEvent: () => ITrackEvent;
