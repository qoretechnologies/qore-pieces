import { TQorePartialActionWithFunction } from 'global/models/qore';
import { IUserInterface } from 'zendesk/models/users';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IGetUser {
  userId: number;
}

// Defining a function to fetch user by id
const getUser = async ({ userId }: IGetUser) => {
  try {
    const data: IUserInterface = await zendeskRequest(`/users/${userId}.json`, 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export default {
  action: 'get_user',
  app_function: getUser,
  options: {
    userId: ZendeskOptions.users.userId,
  },
  response_type: {
    created_at: {
      display_name: 'Created At',
      short_desc: 'The date and time the user was created',
      desc: 'The date and time the user was created',
      name: 'created_at',
      example_value: '2021-08-25T09:00:00Z',
      type: '*date',
    },
    id: {
      type: '*number',
      name: 'id',
      display_name: 'User ID',
      short_desc: 'The unique identifier for the user',
      desc: 'The unique identifier for the user',
      example_value: 123,
    },
    name: {
      type: '*string',
      name: 'name',
      display_name: 'Name',
      short_desc: 'The user’s name',
      desc: 'The user’s name',
      example_value: 'John Doe',
    },
  },
} satisfies TQorePartialActionWithFunction;
