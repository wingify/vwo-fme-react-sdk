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

export const dummySettings = {
  sdkKey: 'test-sdk-key',
  accountId: 12345,
  version: 1,
  features: [
    {
      key: 'test-feature',
      name: 'Test Feature',
      type: 'FEATURE_FLAG',
      status: 'ON',
      id: 1,
      rules: [
        {
          type: 'FLAG_ROLLOUT',
          variationId: 1,
          campaignId: 1,
          ruleKey: 'test-rule',
        },
      ],
    },
  ],
  campaigns: [
    {
      id: 1,
      key: 'test-campaign',
      name: 'Test Campaign',
      type: 'FLAG_ROLLOUT',
      status: 'RUNNING',
      variations: [
        {
          id: 1,
          name: 'Control',
          weight: 100,
          variables: [
            {
              id: 1,
              key: 'test-var',
              type: 'string',
              value: 'test-value',
            },
          ],
        },
      ],
    },
  ],
  // Mock methods
  getSdkkey: jest.fn().mockReturnValue('test-sdk-key'),
  getAccountId: jest.fn().mockReturnValue(12345),
  getVersion: jest.fn().mockReturnValue(1),
  getCollectionPrefix: jest.fn().mockReturnValue(''),
  getCampaignGroups: jest.fn().mockReturnValue({}),
  getGroups: jest.fn().mockReturnValue({}),
  getFeatures: jest.fn().mockReturnValue([]),
  getCampaigns: jest.fn().mockReturnValue([]),
};
