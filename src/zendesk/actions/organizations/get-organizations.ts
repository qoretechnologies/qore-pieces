import { IOrganizationInterface } from 'zendesk/models/organizations';
import { zendeskRequest } from '../../client';
import { TQorePartialActionWithFunction } from 'global/models/qore';

// Defining a function to fetch organization
const getOrganizations = async () => {
  try {
    const data: IOrganizationInterface = await zendeskRequest(`/organizations.json`, 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
};

export default {
  action: 'get_organizations',
  app_function: getOrganizations,
  options: null,
  response_type: {
    organizations: {
      display_name: 'organizations',
      short_desc: 'All organizations',
      desc: 'Got the all available organizations',
      name: 'organizations',
      example_value: [],
      type: '*list',
    },
    next_page: {
      type: '*number',
      name: 'next_page',
      display_name: 'Next Page',
      short_desc: 'Next page number',
      desc: 'Next page number',
      example_value: 2,
    },
    previous_page: {
      type: '*number',
      name: 'previous_page',
      display_name: 'Previous Page',
      short_desc: 'Previous page number',
      desc: 'Previous page number',
      example_value: 1,
    },
    count: {
      type: '*number',
      name: 'count',
      display_name: 'Count',
      short_desc: 'The organizations count',
      desc: 'The organizations count',
      example_value: 10,
    },
  },
} satisfies TQorePartialActionWithFunction;
