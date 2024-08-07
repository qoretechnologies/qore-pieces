import { TQorePartialActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';

interface IDeleteGroup {
  groupId: number;
}

// Defining a function to delete group
const deleteGroup = async ({ groupId }: IDeleteGroup) => {
  try {
    const data = await zendeskRequest(`/groups/${groupId}.json`, 'DELETE');
    return data;
  } catch (error) {
    console.error('Error delete group:', error);
    throw error;
  }
};

export default {
  action: 'delete_group',
  app_function: deleteGroup,
  options: null,
  response_type: null,
} satisfies TQorePartialActionWithFunction;
