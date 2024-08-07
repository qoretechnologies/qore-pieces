import { IUsersInterface } from 'zendesk/models/users';
import { zendeskRequest } from '../../client';
import { TQorePartialActionWithFunction } from 'global/models/qore';

// Defining a function to fetch users
const getUsers = async () => {
  try {
    const data: IUsersInterface = await zendeskRequest('/users.json', 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default {
  action: 'get_users',
  app_function: getUsers,
  options: null,
  response_type: {
    users: {
      display_name: 'users',
      short_desc: 'All users',
      desc: 'Got the all available users',
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
      short_desc: 'The users count',
      desc: 'The users count',
      example_value: 10,
    },
  },
} satisfies TQorePartialActionWithFunction;
