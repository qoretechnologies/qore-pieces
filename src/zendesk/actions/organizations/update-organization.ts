import {
  IResponseOrganizationInterface,
  IUpdateCreateOrganizationInterface,
} from 'zendesk/models/organizations';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';
import { TQorePartialActionWithFunction } from 'global/models/qore';

interface IUpdateOrganization {
  organizationId: number;
  organizationUpdate: IUpdateCreateOrganizationInterface;
}

// Defining a function to update a organization
const updateOrganization = async ({ organizationId, organizationUpdate }: IUpdateOrganization) => {
  try {
    const data: IResponseOrganizationInterface = await zendeskRequest(
      `/organizations/${organizationId}.json`,
      'POST',
      {
        organization: organizationUpdate,
      }
    );
    return data;
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
};

export default {
  action: 'update_organization',
  app_function: updateOrganization,
  options: {
    organizationId: ZendeskOptions.organization.organizationId,
    organizationCreate: ZendeskOptions.organization.organizationCreateUpdate,
  },
  response_type: {
    created_at: {
      display_name: 'Created At',
      short_desc: 'The date and time the organization was created',
      desc: 'The date and time the organization was created',
      name: 'created_at',
      example_value: '2021-08-25T09:00:00Z',
      type: '*date',
    },
    id: {
      type: '*number',
      name: 'id',
      display_name: 'organization ID',
      short_desc: 'The unique identifier for the organization',
      desc: 'The unique identifier for the organization',
      example_value: 123,
    },
    name: {
      type: '*string',
      name: 'name',
      display_name: 'Name',
      short_desc: 'The organization’s name',
      desc: 'The organization’s name',
      example_value: 'Organization #1',
    },
  },
} satisfies TQorePartialActionWithFunction;
