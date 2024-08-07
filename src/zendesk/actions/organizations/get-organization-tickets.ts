import { TQorePartialActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IGetOrganizationTickets {
  organizationId: number;
  count?: boolean;
}

// Defining a function to fetch organization tickets by id
const getOrganizationTickets = async ({ organizationId, count }: IGetOrganizationTickets) => {
  try {
    const data = await zendeskRequest(
      `/organizations/${organizationId}/tickets${count ? '/count' : ''}.json`,
      'GET'
    );
    return data;
  } catch (error) {
    console.error('Error fetching organization tickets:', error);
    throw error;
  }
};

export default {
  action: 'get_organization_tickets',
  app_function: getOrganizationTickets,
  options: {
    organizationId: ZendeskOptions.organization.organizationId,
    count: ZendeskOptions.organization.count,
  },
  response_type: {
    tickets: {
      display_name: 'Organization Tickets',
      short_desc: 'Organization tickets',
      desc: 'Got the organization all available tickets',
      name: 'tickets',
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
      short_desc: 'The tickets count',
      desc: 'The tickets count',
      example_value: 10,
    },
  },
} satisfies TQorePartialActionWithFunction;
