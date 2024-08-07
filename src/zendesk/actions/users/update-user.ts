import { IResponseUserInterface, IUpdateCreateUserInterface } from 'zendesk/models/users';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';
import { TQorePartialActionWithFunction } from 'global/models/qore';

interface IUpdateUser {
  userId: number;
  userUpdate: IUpdateCreateUserInterface;
}

// Defining a function to update a user
const updateUser = async ({ userId, userUpdate }: IUpdateUser) => {
  try {
    const data: IResponseUserInterface = await zendeskRequest(`/users/${userId}.json`, 'POST', {
      user: userUpdate,
    });
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export default {
  action: 'update_user',
  app_function: updateUser,
  options: {
    userId: ZendeskOptions.users.userId,
    userUpdate: ZendeskOptions.users.userCreateUpdate,
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
      example_value: 'User #1',
    },
  },
} satisfies TQorePartialActionWithFunction;
