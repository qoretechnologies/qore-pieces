import type { BaseTranslation } from '../i18n-types';

const en = {
  common: {},
  apps: {
    zendesk: {
      displayName: 'Zendesk',
      shortDesc: 'Collection of actions to interact with Zendesk API',
      longDesc: 'Collection of actions to interact with Zendesk API',
      actions: {
        get_user: {
          displayName: 'Get User',
          shortDesc: 'Get user by ID',
          longDesc: 'Get user by ID',
        },
      },
    },
  },
} satisfies BaseTranslation;

export default en;
