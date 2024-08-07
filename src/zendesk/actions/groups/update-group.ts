import { TQorePartialActionWithFunction } from 'global/models/qore';
import { IResponseGroupInterface, IUpdateCreateGroupInterface } from 'zendesk/models/groups';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IGetGroupUsers {
  groupId: number;
  groupUpdate: IUpdateCreateGroupInterface;
}

// Defining a function to update a group
const updateGroup = async ({ groupId, groupUpdate }: IGetGroupUsers) => {
  try {
    const data: IResponseGroupInterface = await zendeskRequest(`/groups/${groupId}.json`, 'POST', {
      group: groupUpdate,
    });
    return data;
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

export default {
  action: 'update_group',
  app_function: updateGroup,
  options: {
    groupId: ZendeskOptions.groups.groupId,
    groupCreate: ZendeskOptions.groups.groupCreateUpdate,
  },
  response_type: {
    created_at: {
      display_name: 'Created At',
      short_desc: 'The date and time the group was created',
      desc: 'The date and time the group was created',
      name: 'created_at',
      example_value: '2021-08-25T09:00:00Z',
      type: '*date',
    },
    id: {
      type: '*number',
      name: 'id',
      display_name: 'Group ID',
      short_desc: 'The unique identifier for the group',
      desc: 'The unique identifier for the group',
      example_value: 123,
    },
    name: {
      type: '*string',
      name: 'name',
      display_name: 'Name',
      short_desc: 'The group’s name',
      desc: 'The group’s name',
      example_value: 'Group #1',
    },
  },
} satisfies TQorePartialActionWithFunction;
