import { IGroupsInterface } from 'zendesk/models/groups';
import { zendeskRequest } from '../../client';
import { TQorePartialActionWithFunction } from 'global/models/qore';

// Defining a function to fetch groups
const getGroups = async () => {
  try {
    const data: IGroupsInterface = await zendeskRequest('/groups.json', 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

export default {
  action: 'get_groups',
  app_function: getGroups,
  options: null,
  response_type: {
    groups: {
      display_name: 'groups',
      short_desc: 'All groups',
      desc: 'Got the all available groups',
      name: 'groups',
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
      short_desc: 'The groups count',
      desc: 'The groups count',
      example_value: 10,
    },
  },
} satisfies TQorePartialActionWithFunction;
