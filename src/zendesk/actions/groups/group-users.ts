import { TQorePartialActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IGetGroupUsers {
  groupId: number;
}

// Defining a function to fetch group users by id
const getGroupUsers = async ({ groupId }: IGetGroupUsers) => {
  try {
    const data = await zendeskRequest(`/groups/${groupId}/users.json`, 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching group users:', error);
    throw error;
  }
};

export default {
  action: 'get_group_users',
  app_function: getGroupUsers,
  options: {
    groupId: ZendeskOptions.groups.groupId,
  },
  response_type: {
    users: {
      display_name: 'group_users',
      short_desc: 'Group all users',
      desc: 'Got the all available users of group',
      name: 'users',
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
