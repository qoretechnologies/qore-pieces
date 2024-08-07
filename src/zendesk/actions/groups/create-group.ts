import { IResponseGroupInterface, IUpdateCreateGroupInterface } from 'zendesk/models/groups';
import { zendeskRequest } from '../../client';
import { TQorePartialActionWithFunction } from 'global/models/qore';
import { ZendeskOptions } from '../options';

interface ICreateGroup {
  groupCreate: IUpdateCreateGroupInterface;
}

// Defining a function to create a group
const createGroup = async ({ groupCreate }: ICreateGroup) => {
  try {
    const data: IResponseGroupInterface = await zendeskRequest('/groups', 'POST', {
      group: groupCreate,
    });
    return data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

export default {
  action: 'create_group',
  app_function: createGroup,
  options: {
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
