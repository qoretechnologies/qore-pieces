import { TQorePartialActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';

interface IDeleteOrganization {
  organizationId: number;
}

// Defining a function to delete organization
const deleteOrganization = async ({ organizationId }: IDeleteOrganization) => {
  try {
    const data = await zendeskRequest(`/organizations/${organizationId}.json`, 'DELETE');
    return data;
  } catch (error) {
    console.error('Error delete organization:', error);
    throw error;
  }
};

export default {
  action: 'delete_organization',
  app_function: deleteOrganization,
  options: null,
  response_type: null,
} satisfies TQorePartialActionWithFunction;

