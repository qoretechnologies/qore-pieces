import { TQorePartialActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IUserTicketsInterface {
  userId: number;
  type?: string;
  count?: boolean;
  showManyIds?: string;
}

// Defining a function to fetch user tickets by id
const getUserTickets = async ({ userId, type, count, showManyIds }: IUserTicketsInterface) => {
  try {
    const uriEnd = showManyIds
      ? `/show_many?ids=${showManyIds}`
      : `${type ? `/${type}` : ''}${count ? '/count' : ''}`;
    const data = await zendeskRequest(`/users/${userId}/tickets${uriEnd}.json`, 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    throw error;
  }
};

export default {
  action: 'get_user_tickets',
  app_function: getUserTickets,
  options: {
    userId: ZendeskOptions.users.userId,
    type: ZendeskOptions.users.type,
    count: ZendeskOptions.users.count,
    showMandyIds: ZendeskOptions.users.showMandyIds,
  },
  response_type: {
    tickets: {
      display_name: 'User Tickets',
      short_desc: 'User Tickets',
      desc: 'Got the user all available tickets',
      name: 'user',
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
      short_desc: 'The user count',
      desc: 'The user count',
      example_value: 10,
    },
  },
} satisfies TQorePartialActionWithFunction;
