import { TQorePartialActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';

interface IDeleteUser {
  userId: number;
}

// Defining a function to delete user
const deleteUser = async ({ userId }: IDeleteUser) => {
  try {
    const data = await zendeskRequest(`/users/${userId}.json`, 'DELETE');
    return data;
  } catch (error) {
    console.error('Error delete user:', error);
    throw error;
  }
};

export default {
  action: 'delete_user',
  app_function: deleteUser,
  options: null,
  response_type: null,
} satisfies TQorePartialActionWithFunction;
