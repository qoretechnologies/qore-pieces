import { TQorePartialActionWithFunction } from 'global/models/qore';
import { IGroupInterface } from 'zendesk/models/groups';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IGetGroup {
  groupId: number;
}

// Defining a function to fetch group by id
const getGroup = async ({ groupId }: IGetGroup) => {
  try {
    const data: IGroupInterface = await zendeskRequest(`/groups/${groupId}.json`, 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching group:', error);
    throw error;
  }
};

export default {
  action: 'get_group',
  app_function: getGroup,
  options: {
    groupId: ZendeskOptions.groups.groupId,
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
      display_name: 'group ID',
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
